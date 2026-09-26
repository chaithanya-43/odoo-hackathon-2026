import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DataTable from "../components/DataTable";
import {
  createDelivery,
  getDeliveries,
  validateDelivery
} from "../services/api";

const emptyForm = {
  reference_no: "",
  customer: "",
  product_id: "",
  quantity: "",
  location_id: "1"
};

function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

  useEffect(() => {
    loadDeliveries();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (
      !form.reference_no ||
      !form.customer ||
      !form.product_id ||
      !form.quantity ||
      !form.location_id
    ) {
      setError("Please fill all delivery fields.");
      return;
    }

    try {
      setSaving(true);

      await createDelivery({
        reference_no: form.reference_no,
        customer: form.customer,
        location_id: Number(form.location_id),
        items: [
          {
            product_id: Number(form.product_id),
            quantity: Number(form.quantity)
          }
        ]
      });

      setForm(emptyForm);
      setSuccess("Delivery created successfully.");
      await loadDeliveries();
    } catch (err) {
      setError(err.message || "Failed to create delivery");
    } finally {
      setSaving(false);
    }
  };

  const handleValidate = async (row) => {
    const id = row.delivery_id ?? row.id;

    try {
      setError("");
      setSuccess("");

      await validateDelivery(id);

      setSuccess("Delivery validated successfully.");
      await loadDeliveries();
    } catch (err) {
      setError(err.message || "Insufficient stock or validation failed");
    }
  };

  const status = (row) =>
    String(row.status || "").toLowerCase();

  const columns = [
    {
      key: "delivery_id",
      label: "ID",
      render: (row) => row.delivery_id ?? row.id ?? "-"
    },
    {
      key: "reference_no",
      label: "Reference"
    },
    {
      key: "customer",
      label: "Customer"
    },
    {
      key: "location_id",
      label: "Location"
    },
    {
      key: "status",
      label: "Status"
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) =>
        ["done", "validated", "completed"].includes(status(row))
          ? "Validated"
          : (
            <button
              className="table-action-btn"
              onClick={() => handleValidate(row)}
            >
              Validate
            </button>
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
              <p>Deliver products from inventory</p>
            </div>
          </div>

          <form className="form-card" onSubmit={handleSubmit}>
            <h2>Create Delivery</h2>

            <div className="form-grid">
              <div className="form-group">
                <label>Reference No</label>
                <input
                  value={form.reference_no}
                  onChange={(e) =>
                    setForm({ ...form, reference_no: e.target.value })
                  }
                  placeholder="DEL-001"
                />
              </div>

              <div className="form-group">
                <label>Customer</label>
                <input
                  value={form.customer}
                  onChange={(e) =>
                    setForm({ ...form, customer: e.target.value })
                  }
                  placeholder="Customer"
                />
              </div>

              <div className="form-group">
                <label>Product ID</label>
                <input
                  type="number"
                  min="1"
                  value={form.product_id}
                  onChange={(e) =>
                    setForm({ ...form, product_id: e.target.value })
                  }
                  placeholder="1"
                />
              </div>

              <div className="form-group">
                <label>Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={form.quantity}
                  onChange={(e) =>
                    setForm({ ...form, quantity: e.target.value })
                  }
                  placeholder="20"
                />
              </div>

              <div className="form-group">
                <label>Location ID</label>
                <input
                  type="number"
                  min="1"
                  value={form.location_id}
                  onChange={(e) =>
                    setForm({ ...form, location_id: e.target.value })
                  }
                />
              </div>
            </div>

            <button className="primary-btn" disabled={saving}>
              {saving ? "Creating..." : "Create Delivery"}
            </button>
          </form>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

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
