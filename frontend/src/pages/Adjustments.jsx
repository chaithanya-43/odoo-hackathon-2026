import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DataTable from "../components/DataTable";
import {
  createAdjustment,
  getAdjustments,
  validateAdjustment
} from "../services/api";

function Adjustments() {
  const [adjustments, setAdjustments] = useState([]);

  const [formData, setFormData] = useState({
    product: "",
    location: "",
    physicalCount: "",
    reason: ""
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadAdjustments();
  }, []);

  const loadAdjustments = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAdjustments();
      const data = response?.data;

      setAdjustments(
        Array.isArray(data)
          ? data
          : data?.adjustments || []
      );
    } catch (err) {
      setError(err.message || "Failed to load adjustments");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    setFormData((previous) => ({
      ...previous,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (
      !formData.product ||
      !formData.location ||
      formData.physicalCount === "" ||
      !formData.reason
    ) {
      setError("Please fill all adjustment fields");
      return;
    }

    if (Number(formData.physicalCount) < 0) {
      setError("Physical count cannot be negative");
      return;
    }

    try {
      setSaving(true);

      await createAdjustment({
        ...formData,
        physicalCount: Number(formData.physicalCount)
      });

      setSuccess("Adjustment created successfully");

      setFormData({
        product: "",
        location: "",
        physicalCount: "",
        reason: ""
      });

      await loadAdjustments();
    } catch (err) {
      setError(err.message || "Failed to create adjustment");
    } finally {
      setSaving(false);
    }
  };

  const handleValidate = async (id) => {
    try {
      setError("");
      setSuccess("");

      await validateAdjustment(id);

      setSuccess("Adjustment validated successfully");

      await loadAdjustments();
    } catch (err) {
      setError(err.message || "Failed to validate adjustment");
    }
  };

  const columns = [
    {
      key: "id",
      label: "ID"
    },
    {
      key: "product",
      label: "Product"
    },
    {
      key: "location",
      label: "Location"
    },
    {
      key: "current",
      label: "Current",
      render: (row) =>
        row.current ??
        row.currentStock ??
        0
    },
    {
      key: "physicalCount",
      label: "Physical Count"
    },
    {
      key: "difference",
      label: "Difference"
    },
    {
      key: "reason",
      label: "Reason"
    },
    {
      key: "status",
      label: "Status"
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) =>
        row.status !== "validated" ? (
          <button
            className="table-action-btn"
            onClick={() => handleValidate(row.id)}
          >
            Validate
          </button>
        ) : (
          <span>Validated</span>
        )
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
              <h1>Inventory Adjustments</h1>
              <p>Record physical inventory adjustments</p>
            </div>
          </div>

          <form
            className="form-card"
            onSubmit={handleSubmit}
          >
            <h2>Create Adjustment</h2>

            <div className="form-grid">

              <div className="form-group">
                <label>Product</label>
                <input
                  type="text"
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                  placeholder="Product ID"
                />
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Location"
                />
              </div>

              <div className="form-group">
                <label>Physical Count</label>
                <input
                  type="number"
                  min="0"
                  name="physicalCount"
                  value={formData.physicalCount}
                  onChange={handleChange}
                  placeholder="Physical count"
                />
              </div>

              <div className="form-group">
                <label>Reason</label>
                <input
                  type="text"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder="Reason"
                />
              </div>

            </div>

            <button
              type="submit"
              className="primary-btn"
              disabled={saving}
            >
              {saving ? "Creating..." : "Create Adjustment"}
            </button>
          </form>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {success && (
            <div className="success-message">
              {success}
            </div>
          )}

          <div className="section-card">
            <h2>Adjustment History</h2>

            <DataTable
              columns={columns}
              data={adjustments}
              loading={loading}
            />
          </div>

        </main>
      </div>
    </div>
  );
}

export default Adjustments;