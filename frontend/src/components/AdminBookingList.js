import React, { useEffect, useState } from "react";
import API from "../api/api";

const AdminBookingList = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchAllBookings = async () => {
      const res = await API.get("/admin/bookings");
      setBookings(res.data);
    };
    fetchAllBookings();
  }, []);

  return (
    <div className="container mt-4">
      <h4>All Bookings</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>User</th>
            <th>Table</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b._id}>
              <td>{b.user?.name}</td>
              <td>{b.table?.tableNumber}</td>
              <td>{b.date}</td>
              <td>{b.timeSlot}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBookingList;
