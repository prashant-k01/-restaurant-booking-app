import React, { useEffect, useState } from "react";
import API from "../api/api";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await API.get("/bookings");
      setBookings(res.data);
    };
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    try {
      await API.delete(`/bookings/${id}`);
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === id ? { ...booking, status: 'cancelled' } : booking
        )
      );
      setMessage("Booking cancelled successfully!");
      setTimeout(() => setMessage(""), 3000); // Auto-hide after 3 seconds
    } catch (err) {
      console.error("Failed to cancel booking:", err);
      setMessage("Failed to cancel booking.");
    }
  };

  return (
    <div className="container mt-4">
      <h4>My Bookings</h4>
      {message && <div className="alert alert-info">{message}</div>}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Table</th>
            <th>Date</th>
            <th>Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b._id}>
              <td>{b.table?.tableNumber}</td>
              <td>{b.date}</td>
              <td>{b.timeSlot}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm ml-2"
                  onClick={() => handleCancel(b._id)}
                  disabled={b.status === "cancelled"}
                >
                  {b.status === "cancelled" ? "Cancelled" : "Cancel"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingHistory;
