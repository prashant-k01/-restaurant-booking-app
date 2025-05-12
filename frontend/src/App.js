import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";

// Pages
import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./pages/UserDashboard";
import BookingForm from "./components/BookingForm";
import BookingHistory from "./components/BookingHistory";
import AdminDashboard from "./pages/AdminDashboard";
import AdminTablePanel from "./components/AdminTablePanel";
import AdminBookingList from "./components/AdminBookingList";

import Navbar from "./components/Navbar";

const App = () => {
  const { auth } = useContext(AuthContext);

  const UserRoute = ({ children }) => {
    return auth.token && !auth.isAdmin ? children : <Navigate to="/login" />;
  };

  const AdminRoute = ({ children }) => {
    return auth.token && auth.isAdmin ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User Routes */}
        <Route
          path="/dashboard"
          element={
            <UserRoute>
              <Dashboard />
            </UserRoute>
          }
        />
        <Route
          path="/book-table"
          element={
            <UserRoute>
              <BookingForm />
            </UserRoute>
          }
        />
        <Route
          path="/my-bookings"
          element={
            <UserRoute>
              <BookingHistory />
            </UserRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/tables"
          element={
            <AdminRoute>
              <AdminTablePanel />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/bookings"
          element={
            <AdminRoute>
              <AdminBookingList />
            </AdminRoute>
          }
        />

        {/* Catch All */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
