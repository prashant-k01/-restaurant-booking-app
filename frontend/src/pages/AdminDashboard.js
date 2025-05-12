import React, { useState } from "react";
import AdminTablePanel from "../components/AdminTablePanel";
import AdminBookingList from "../components/AdminBookingList";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("tables");
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="container-fluid">
  {/* Toggle Button for Mobile */}
  <button
    className="btn btn-primary d-md-none m-2"
    onClick={() => setShowSidebar(!showSidebar)}
  >
    ☰ Menu
  </button>

  <div className="row">
    {/* Sidebar */}
    {(showSidebar || window.innerWidth >= 768) && (
      <div
        className={`col-md-3 bg-light min-vh-100 p-3 shadow-sm ${
          showSidebar ? "d-block" : "d-none"
        } d-md-block`}
      >
        <h4 className="mb-4">🛠️ Admin Dashboard</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <button
              className={`btn w-100 ${
                activeTab === "tables" ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setActiveTab("tables")}
            >
              Manage Tables
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`btn w-100 ${
                activeTab === "bookings"
                  ? "btn-secondary"
                  : "btn-outline-secondary"
              }`}
              onClick={() => setActiveTab("bookings")}
            >
              View All Bookings
            </button>
          </li>
        </ul>
      </div>
    )}

        {/* Main Content */}
        <div className="col-md-9 p-4">
          {activeTab === "tables" && <AdminTablePanel />}
          {activeTab === "bookings" && <AdminBookingList />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
