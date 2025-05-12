import React, { useState } from 'react';
import AvailableTables from '../components/AvailableTable';
import BookingForm from '../components/BookingForm';
import BookingHistory from '../components/BookingHistory';
import { FaChair, FaClock, FaCalendarCheck } from 'react-icons/fa'; // icons

const UserDashboard = () => {
  const [activeSection, setActiveSection] = useState('book');

  const renderContent = () => {
    switch (activeSection) {
      case 'book': return <BookingForm />;
      case 'bookings': return <BookingHistory />;
      case 'available': return <AvailableTables />;
      default: return <BookingForm />;
    }
  };

  return (
    <div className="container-fluid">
      <div className="row min-vh-100">
        {/* Sidebar */}
        <div className="col-md-3 bg-dark text-light p-4 shadow-sm">
          <h4 className="text-center mb-4">🍽️ User Dashboard</h4>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <button
                className={`btn w-100 text-start ${activeSection === 'book' ? 'btn-light' : 'btn-outline-light'}`}
                onClick={() => setActiveSection('book')}
              >
                <FaCalendarCheck className="me-2" /> Book a Table
              </button>
            </li>
            <li className="nav-item mb-2">
              <button
                className={`btn w-100 text-start ${activeSection === 'bookings' ? 'btn-light' : 'btn-outline-light'}`}
                onClick={() => setActiveSection('bookings')}
              >
                <FaClock className="me-2" /> My Bookings
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`btn w-100 text-start ${activeSection === 'available' ? 'btn-light' : 'btn-outline-light'}`}
                onClick={() => setActiveSection('available')}
              >
                <FaChair className="me-2" /> Available Tables
              </button>
            </li>
          </ul>
        </div>

        {/* Main content */}
        <div className="col-md-9 p-5 bg-light">
          <div className="card shadow-sm">
            <div className="card-body">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
