import React from "react";

function StatCard({ title, value, icon }) {
  return (
    <div className="stat-card">
      <div className="stat-card-icon">
        <i className={`bx ${icon}`}></i>
      </div>

      <div className="stat-card-content">
        <p>{title}</p>
        <h2>{value ?? 0}</h2>
      </div>
    </div>
  );
}

export default StatCard;