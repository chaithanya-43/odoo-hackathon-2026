import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2>StockSense</h2>
      </div>

      <div className="navbar-right">
        <button
          className="profile-btn"
          onClick={() => navigate("/profile")}
        >
          <i className="bx bx-user"></i>
          Profile
        </button>

        <button className="logout-btn" onClick={handleLogout}>
          <i className="bx bx-log-out"></i>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;