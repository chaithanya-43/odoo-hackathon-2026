import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DataTable from "../components/DataTable";
import {
  createDelivery,
  getDeliveries,
  validateDelivery
} from "../services/api";

function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);

  const [formData, setFormData] = useState({
    customer: "",
    product: "",
    quantity: "",
    location: ""
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadDeliveries();
  }, []);

  const loadDeliveries = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getDeliveries();
      const data = response?.data;

      setDeliveries(
        Array.isArray(data)
          ? data
          : data?.deliveries || []
      );
    } catch (err) {
      setError(err.message || "Failed to load deliveries");
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
      !formData.customer ||
      !formData.product ||
      !formData.quantity ||
      !formData.location
    ) {
      setError("Please fill all delivery fields");
      return;
    }

    if (Number(formData.quantity) <= 0) {
      setError("Quantity must be greater than zero");
      return;
    }

    try {
      setSaving(true);

      await createDelivery({
        ...formData,
        quantity: Number(formData.quantity)
      });

      setSuccess("Delivery created successfully");

      setFormData({
        customer: "",
        product: "",
        quantity: "",
        location: ""
      });

      await loadDeliveries();
    } catch (err) {
      setError(err.message || "Failed to create delivery");
    } finally {
      setSaving(false);
    }
  };

  const handleValidate = async (id) => {
    try {
      setError("");
      setSuccess("");

      await validateDelivery(id);

      setSuccess("Delivery validated successfully");

      await loadDeliveries();
    } catch (err) {
      setError(
        err.message || "Insufficient stock or validation failed"
      );
    }
  };

  const columns = [
    {
      key: "id",
      label: "ID"
    },
    {
      key: "customer",
      label: "Customer"
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
              <h1>Deliveries</h1>
              <p>Manage outgoing inventory deliveries</p>
            </div>
          </div>

          <form
            className="form-card"
            onSubmit={handleSubmit}
          >
            <h2>Create Delivery</h2>

            <div className="form-grid">

              <div className="form-group">
                <label>Customer</label>
                <input
                  type="text"
                  name="customer"
                  value={formData.customer}
                  onChange={handleChange}
                  placeholder="Customer"
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
              {saving ? "Creating..." : "Create Delivery"}
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
            <h2>Delivery History</h2>

            <DataTable
              columns={columns}
              data={deliveries}
              loading={loading}
            />
          </div>

        </main>
      </div>
    </div>
  );
}

export default Deliveries;