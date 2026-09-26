import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import { getDashboard } from "../services/api";

function Dashboard() {
  const [dashboard, setDashboard] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getDashboard();

      if (!response?.success) {
        throw new Error(response?.message || "Unable to load dashboard");
      }

      setDashboard(response.data || {});
    } catch (err) {
      setError(err.message || "Unable to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-area">
        <Navbar />

        <main className="page-content">
          <div className="page-header">
            <div>
              <h1>Dashboard</h1>
              <p>StockSense Inventory Management System</p>
            </div>

            <button
              className="secondary-btn"
              onClick={loadDashboard}
            >
              Refresh
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}

          {loading ? (
            <div className="table-message">
              Loading dashboard...
            </div>
          ) : (
            <div className="stats-grid">
              <StatCard
                title="Products"
                value={dashboard.products}
              />

              <StatCard
                title="Locations"
                value={dashboard.locations}
              />

              <StatCard
                title="Total Stock"
                value={dashboard.total_stock}
              />

              <StatCard
                title="Low / Out of Stock"
                value={dashboard.low_stock}
              />

              <StatCard
                title="Pending Receipts"
                value={dashboard.pending_receipts}
              />

              <StatCard
                title="Pending Deliveries"
                value={dashboard.pending_deliveries}
              />

              <StatCard
                title="Scheduled Transfers"
                value={dashboard.scheduled_transfers}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
