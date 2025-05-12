import React, { useState, useEffect } from "react";
import API from "../api/api";

const BookingForm = () => {
  const [tables, setTables] = useState([]);
  const [tableId, setTableId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchTables = async () => {
      const res = await API.get("/tables");
      setTables(res.data);
    };
    fetchTables();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting booking:", { table: tableId, date, timeSlot :time });
    try {
      await API.post("/bookings", { table:tableId, date, timeSlot:time });
      setMessage("Booking successful! Check your email for confirmation.");
    } catch (err) {
      setMessage(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="container mt-4 col-md-6">
      <h4>Book a Table</h4>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <select
          className="form-control mb-2"
          value={tableId}
          onChange={(e) => setTableId(e.target.value)}
          required
        >
          <option value="">Select Table</option>
          {tables.map((table) => (
            <option key={table._id} value={table._id}>
              Table {table.tableNumber} ({table.seats} seats)
            </option>
          ))}
        </select>
        <input
          className="form-control mb-2"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          className="form-control mb-2"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <button className="btn btn-success w-100">Book Now</button>
      </form>
    </div>
  );
};

export default BookingForm;
