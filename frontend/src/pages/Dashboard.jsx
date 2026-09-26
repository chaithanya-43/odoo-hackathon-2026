import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import { getDashboard } from "../services/api";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getDashboard();

      if (!response?.success) {
        throw new Error(response?.message || "Unable to load dashboard.");
      }

      setDashboard(response.data || {});
    } catch (err) {
      setError(err.message || "Unable to load dashboard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>StockSense Inventory Management System</p>
        </div>

        <button className="refresh-btn" onClick={loadDashboard}>
          Refresh
        </button>
      </div>

      {loading && (
        <div className="dashboard-message">
          Loading dashboard...
        </div>
      )}

      {error && (
        <div className="dashboard-error">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="stats-grid">
          <StatCard
            title="Total Products in Stock"
            value={dashboard?.totalProductsInStock ?? 0}
          />

          <StatCard
            title="Low / Out of Stock"
            value={dashboard?.lowOrOutOfStock ?? 0}
          />

          <StatCard
            title="Pending Receipts"
            value={dashboard?.pendingReceipts ?? 0}
          />

          <StatCard
            title="Pending Deliveries"
            value={dashboard?.pendingDeliveries ?? 0}
          />

          <StatCard
            title="Internal Transfers Scheduled"
            value={dashboard?.internalTransfersScheduled ?? 0}
          />
        </div>
      )}
    </div>
  );
}

export default Dashboard;