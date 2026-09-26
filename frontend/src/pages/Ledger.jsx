import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DataTable from "../components/DataTable";
import { getLedger } from "../services/api";

function Ledger() {
  const [ledger, setLedger] = useState([]);

  const [filters, setFilters] = useState({
    date: "",
    product: "",
    movementType: ""
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadLedger();
  }, []);

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

  const handleChange = (event) => {
    setFilters((previous) => ({
      ...previous,
      [event.target.name]: event.target.value
    }));
  };

  const columns = [
    {
      key: "date",
      label: "Date"
    },
    {
      key: "product",
      label: "Product"
    },
    {
      key: "movementType",
      label: "Movement Type"
    },
    {
      key: "quantity",
      label: "Quantity"
    },
    {
      key: "source",
      label: "Source"
    },
    {
      key: "destination",
      label: "Destination"
    },
    {
      key: "reference",
      label: "Reference"
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
              <p>View complete inventory movement history</p>
            </div>
          </div>

          <div className="filter-bar">

            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={handleChange}
            />

            <input
              type="text"
              name="product"
              value={filters.product}
              onChange={handleChange}
              placeholder="Product"
            />

            <select
              name="movementType"
              value={filters.movementType}
              onChange={handleChange}
            >
              <option value="">All Movement Types</option>
              <option value="receipt">Receipt</option>
              <option value="delivery">Delivery</option>
              <option value="transfer">Transfer</option>
              <option value="adjustment">Adjustment</option>
            </select>

            <button
              className="secondary-btn"
              onClick={loadLedger}
            >
              Filter
            </button>

          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

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