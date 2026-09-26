import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DataTable from "../components/DataTable";
import {
  createReceipt,
  getReceipts,
  validateReceipt
} from "../services/api";

const emptyForm = {
  reference_no: "",
  supplier: "",
  product_id: "",
  quantity: "",
  location_id: "1"
};

function Receipts() {
  const [receipts, setReceipts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

  useEffect(() => {
    loadReceipts();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (
      !form.reference_no ||
      !form.supplier ||
      !form.product_id ||
      !form.quantity ||
      !form.location_id
    ) {
      setError("Please fill all receipt fields.");
      return;
    }

    try {
      setSaving(true);

      await createReceipt({
        reference_no: form.reference_no,
        supplier: form.supplier,
        location_id: Number(form.location_id),
        items: [
          {
            product_id: Number(form.product_id),
            quantity: Number(form.quantity)
          }
        ]
      });

      setForm(emptyForm);
      setSuccess("Receipt created successfully.");
      await loadReceipts();
    } catch (err) {
      setError(err.message || "Failed to create receipt");
    } finally {
      setSaving(false);
    }
  };

  const handleValidate = async (row) => {
    const id = row.receipt_id ?? row.id;

    try {
      setError("");
      setSuccess("");

      await validateReceipt(id);

      setSuccess("Receipt validated successfully.");
      await loadReceipts();
    } catch (err) {
      setError(err.message || "Failed to validate receipt");
    }
  };

  const status = (row) =>
    String(row.status || "").toLowerCase();

  const columns = [
    {
      key: "receipt_id",
      label: "ID",
      render: (row) => row.receipt_id ?? row.id ?? "-"
    },
    {
      key: "reference_no",
      label: "Reference"
    },
    {
      key: "supplier",
      label: "Supplier"
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
              <h1>Receipts</h1>
              <p>Receive products into inventory</p>
            </div>
          </div>

          <form className="form-card" onSubmit={handleSubmit}>
            <h2>Create Receipt</h2>

            <div className="form-grid">
              <div className="form-group">
                <label>Reference No</label>
                <input
                  name="reference_no"
                  value={form.reference_no}
                  onChange={(e) =>
                    setForm({ ...form, reference_no: e.target.value })
                  }
                  placeholder="REC-001"
                />
              </div>

              <div className="form-group">
                <label>Supplier</label>
                <input
                  name="supplier"
                  value={form.supplier}
                  onChange={(e) =>
                    setForm({ ...form, supplier: e.target.value })
                  }
                  placeholder="Supplier"
                />
              </div>

              <div className="form-group">
                <label>Product ID</label>
                <input
                  type="number"
                  min="1"
                  name="product_id"
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
                  name="quantity"
                  value={form.quantity}
                  onChange={(e) =>
                    setForm({ ...form, quantity: e.target.value })
                  }
                  placeholder="100"
                />
              </div>

              <div className="form-group">
                <label>Location ID</label>
                <input
                  type="number"
                  min="1"
                  name="location_id"
                  value={form.location_id}
                  onChange={(e) =>
                    setForm({ ...form, location_id: e.target.value })
                  }
                />
              </div>
            </div>

            <button className="primary-btn" disabled={saving}>
              {saving ? "Creating..." : "Create Receipt"}
            </button>
          </form>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

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
