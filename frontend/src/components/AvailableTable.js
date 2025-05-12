import React, { useState} from 'react';
import API from '../api/api'; // assuming this is the API instance you're using for Axios

const AvailableTables = () => {
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [availableTables, setAvailableTables] = useState([]);
  const [message, setMessage] = useState('');

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleTimeSlotChange = (e) => {
    setTimeSlot(e.target.value);
  };

  const fetchAvailableTables = async () => {
    if (!date || !timeSlot) {
      setMessage("Please select both date and time slot.");
      return;
    }

    try {
      const response = await API.get(`/tables/available?date=${date}&timeSlot=${timeSlot}`);
      setAvailableTables(response.data);
      setMessage('');  // Clear any previous error message
    } catch (error) {
      setMessage('Failed to fetch available tables.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchAvailableTables();
  };

  return (
    <div className="container mt-5">
      <h4>View Available Tables</h4>
      {message && <div className="alert alert-danger">{message}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Select Date</label>
          <input
            type="date"
            className="form-control"
            id="date"
            value={date}
            onChange={handleDateChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="timeSlot" className="form-label">Select Time Slot</label>
          <input
            type="time"
            className="form-control"
            id="timeSlot"
            value={timeSlot}
            onChange={handleTimeSlotChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Show Available Tables
        </button>
      </form>

      <h5 className="mt-4">Available Tables</h5>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Table Number</th>
            <th>Seats</th>
          </tr>
        </thead>
        <tbody>
          {availableTables.length > 0 ? (
            availableTables.map((table) => (
              <tr key={table._id}>
                <td>{table.tableNumber}</td>
                <td>{table.seats}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">Enter a time and date to see the available tables</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AvailableTables;
