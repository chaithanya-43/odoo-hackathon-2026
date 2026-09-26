import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DataTable from "../components/DataTable";
import { getLedger } from "../services/api";

function Ledger() {
  const [ledger, setLedger] = useState([]);
  const [filters, setFilters] = useState({
    product_id: "",
    location_id: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadLedger = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getLedger(filters);
      const data = response?.data;

      setLedger(
        Array.isArray(data)
          ? data
          : data?.ledger || []
      );
    } catch (err) {
      setError(err.message || "Failed to load ledger");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLedger();
  }, []);

  const columns = [
    {
      key: "ledger_id",
      label: "ID",
      render: (row) => row.ledger_id ?? row.id ?? "-"
    },
    {
      key: "movement_type",
      label: "Movement",
      render: (row) =>
        row.movement_type ??
        row.movementType ??
        "-"
    },
    {
      key: "product_id",
      label: "Product",
      render: (row) =>
        row.product_id ??
        row.product ??
        "-"
    },
    {
      key: "quantity",
      label: "Quantity"
    },
    {
      key: "location_id",
      label: "Location",
      render: (row) =>
        row.location_id ??
        row.location ??
        "-"
    },
    {
      key: "reference_no",
      label: "Reference",
      render: (row) =>
        row.reference_no ??
        row.reference ??
        "-"
    },
    {
      key: "created_at",
      label: "Date",
      render: (row) =>
        row.created_at ??
        row.date ??
        "-"
    }
  ];

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-area">
        <Navbar />

        <main className="page-content">
          <div className="page-header">
            <div>
              <h1>Stock Ledger</h1>
              <p>Complete inventory movement history</p>
            </div>
          </div>

          <div className="filter-bar">
            <input
              type="number"
              min="1"
              placeholder="Product ID"
              value={filters.product_id}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  product_id: e.target.value
                })
              }
            />

            <input
              type="number"
              min="1"
              placeholder="Location ID"
              value={filters.location_id}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  location_id: e.target.value
                })
              }
            />

            <button
              className="secondary-btn"
              onClick={loadLedger}
            >
              Filter
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}

          <DataTable
            columns={columns}
            data={ledger}
            loading={loading}
          />
        </main>
      </div>
    </div>
  );
}

export default Ledger;
