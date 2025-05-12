import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { FaUser, FaSignOutAlt, FaUtensils, FaClipboardList, FaCalendarAlt, FaCog, FaBook } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const { auth, logout } = useContext(AuthContext);
  const { token, isAdmin } = auth;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3 px-4">
      <Link className="navbar-brand fw-bold fs-4 d-flex align-items-center" to="/">
        <FaUtensils className="me-2" />Restaurant
      </Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto gap-2">
          {token && !isAdmin && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  <FaUser className="me-1" /> Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/book-table">
                  <FaCalendarAlt className="me-1" /> Book Table
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/my-bookings">
                  <FaClipboardList className="me-1" /> My Bookings
                </Link>
              </li>
            </>
          )}
          {token && isAdmin && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/admin">
                  <FaCog className="me-1" /> Admin Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/tables">
                  <FaUtensils className="me-1" /> Manage Tables
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/bookings">
                  <FaBook className="me-1" /> All Bookings
                </Link>
              </li>
            </>
          )}
        </ul>

        <ul className="navbar-nav ms-auto">
          {!token ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <button className="btn btn-outline-light d-flex align-items-center" onClick={handleLogout}>
                <FaSignOutAlt className="me-2" /> Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
