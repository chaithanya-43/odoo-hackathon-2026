import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DataTable from "../components/DataTable";
import {
  createReceipt,
  getReceipts,
  validateReceipt
} from "../services/api";

function Receipts() {
  const [receipts, setReceipts] = useState([]);

  const [formData, setFormData] = useState({
    supplier: "",
    product: "",
    quantity: "",
    location: ""
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadReceipts();
  }, []);

  const loadReceipts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getReceipts();
      const data = response?.data;

      setReceipts(
        Array.isArray(data)
          ? data
          : data?.receipts || []
      );
    } catch (err) {
      setError(err.message || "Failed to load receipts");
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
      !formData.supplier ||
      !formData.product ||
      !formData.quantity ||
      !formData.location
    ) {
      setError("Please fill all receipt fields");
      return;
    }

    if (Number(formData.quantity) <= 0) {
      setError("Quantity must be greater than zero");
      return;
    }

    try {
      setSaving(true);

      await createReceipt({
        ...formData,
        quantity: Number(formData.quantity)
      });

      setSuccess("Receipt created successfully");

      setFormData({
        supplier: "",
        product: "",
        quantity: "",
        location: ""
      });

      await loadReceipts();
    } catch (err) {
      setError(err.message || "Failed to create receipt");
    } finally {
      setSaving(false);
    }
  };

  const handleValidate = async (id) => {
    try {
      setError("");
      setSuccess("");

      await validateReceipt(id);

      setSuccess("Receipt validated successfully");

      await loadReceipts();
    } catch (err) {
      setError(err.message || "Failed to validate receipt");
    }
  };

  const columns = [
    {
      key: "id",
      label: "ID"
    },
    {
      key: "supplier",
      label: "Supplier"
    },
    {
      key: "product",
      label: "Product"
    },
    {
      key: "quantity",
      label: "Quantity"
    },
    {
      key: "location",
      label: "Location"
    },
    {
      key: "status",
      label: "Status"
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
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
              <h1>Receipts</h1>
              <p>Receive products into inventory</p>
            </div>
          </div>

          <form
            className="form-card"
            onSubmit={handleSubmit}
          >
            <h2>Create Receipt</h2>

            <div className="form-grid">

              <div className="form-group">
                <label>Supplier</label>
                <input
                  type="text"
                  name="supplier"
                  value={formData.supplier}
                  onChange={handleChange}
                  placeholder="Supplier"
                />
              </div>

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
                <label>Quantity</label>
                <input
                  type="number"
                  min="1"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="Quantity"
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

            </div>

            <button
              type="submit"
              className="primary-btn"
              disabled={saving}
            >
              {saving ? "Creating..." : "Create Receipt"}
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
            <h2>Receipt History</h2>

            <DataTable
              columns={columns}
              data={receipts}
              loading={loading}
            />
          </div>

        </main>
      </div>
    </div>
  );
}

export default Receipts;