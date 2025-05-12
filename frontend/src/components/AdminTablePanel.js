import React, { useEffect, useState } from 'react';
import API from '../api/api';

const AdminTablePanel = () => {
  const [tables, setTables] = useState([]);
  const [tableNumber, setTableNumber] = useState('');
  const [seats, setSeats] = useState('');
  const [message, setMessage] = useState('');

  const fetchTables = async () => {
    try {
      const res = await API.get('/tables');
      setTables(res.data);
    } catch (err) {
      setMessage('Failed to fetch tables');
      console.error('Error fetching tables:', err); // Log error details for debugging
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  const handleAddTable = async (e) => {
    e.preventDefault();
    try {
      await API.post('/tables', { tableNumber, seats });
      setMessage('Table added successfully');
      setTableNumber('');
      setSeats('');
      fetchTables(); // Re-fetch the table list after adding a new one
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to add table');
      console.error('Error adding table:', err); // Log error details for debugging
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/tables/${id}`);
      setMessage('Table deleted successfully');
      fetchTables(); // Re-fetch the table list after deletion
    } catch (err) {
      // Handle different error types and provide detailed feedback
      if (err.response) {
        setMessage(`Delete failed: ${err.response?.data?.message || 'Unknown error'}`);
      } else {
        setMessage('Delete failed: Server error');
      }
      console.error('Error deleting table:', err); // Log error details for debugging
    }
  };

  return (
    <div className="container mt-5">
    <div className="card shadow-sm">
      <div className="card-body">
        <h4 className="mb-4">🍽️ Add New Table</h4>

        {message && <div className="alert alert-info">{message}</div>}

        <form onSubmit={handleAddTable}>
          <div className="row g-3">
            <div className="col-md-4">
              <input
                className="form-control"
                type="text"
                placeholder="Table Number"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                required
              />
            </div>
            <div className="col-md-4">
              <input
                className="form-control"
                type="number"
                placeholder="Seats"
                value={seats}
                onChange={(e) => {
                  const val = Math.max(0, Number(e.target.value)); // prevent negative
                  setSeats(val);
                }}
                required
                min="0"
              />
            </div>
            <div className="col-md-4 d-grid">
              <button className="btn btn-success" type="submit">
                ➕ Add Table
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <div className="card mt-4 shadow-sm">
      <div className="card-body">
        <h5 className="mb-3">📋 Table List</h5>
        {tables.length === 0 ? (
          <div className="text-muted">No tables added yet.</div>
        ) : (
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Table Number</th>
                <th>Seats</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tables.map((t) => (
                <tr key={t._id}>
                  <td>{t.tableNumber}</td>
                  <td>{t.seats}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(t._id)}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  </div>
  );
};

export default AdminTablePanel;
