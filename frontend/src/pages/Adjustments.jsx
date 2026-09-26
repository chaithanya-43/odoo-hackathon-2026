import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DataTable from "../components/DataTable";
import {
  createAdjustment,
  getAdjustments,
  validateAdjustment
} from "../services/api";

const emptyForm = {
  reference_no: "",
  location_id: "1",
  product_id: "",
  physical_quantity: "",
  reason: ""
};

function Adjustments() {
  const [adjustments, setAdjustments] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

  useEffect(() => {
    loadAdjustments();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (
      !form.reference_no ||
      !form.location_id ||
      !form.product_id ||
      form.physical_quantity === "" ||
      !form.reason
    ) {
      setError("Please fill all adjustment fields.");
      return;
    }

    if (Number(form.physical_quantity) < 0) {
      setError("Physical quantity cannot be negative.");
      return;
    }

    try {
      setSaving(true);

      await createAdjustment({
        reference_no: form.reference_no,
        location_id: Number(form.location_id),
        reason: form.reason,
        items: [
          {
            product_id: Number(form.product_id),
            physical_quantity: Number(form.physical_quantity)
          }
        ]
      });

      setForm(emptyForm);
      setSuccess("Adjustment created successfully.");
      await loadAdjustments();
    } catch (err) {
      setError(err.message || "Failed to create adjustment");
    } finally {
      setSaving(false);
    }
  };

  const handleValidate = async (row) => {
    const id = row.adjustment_id ?? row.id;

    try {
      setError("");
      setSuccess("");

      await validateAdjustment(id);

      setSuccess("Adjustment validated successfully.");
      await loadAdjustments();
    } catch (err) {
      setError(err.message || "Adjustment validation failed");
    }
  };

  const status = (row) =>
    String(row.status || "").toLowerCase();

  const columns = [
    {
      key: "adjustment_id",
      label: "ID",
      render: (row) => row.adjustment_id ?? row.id ?? "-"
    },
    {
      key: "reference_no",
      label: "Reference"
    },
    {
      key: "location_id",
      label: "Location"
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
              <h1>Inventory Adjustments</h1>
              <p>Set physical stock counts</p>
            </div>
          </div>

          <form className="form-card" onSubmit={handleSubmit}>
            <h2>Create Adjustment</h2>

            <div className="form-grid">
              <div className="form-group">
                <label>Reference No</label>
                <input
                  value={form.reference_no}
                  onChange={(e) =>
                    setForm({ ...form, reference_no: e.target.value })
                  }
                  placeholder="ADJ-001"
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
                <label>Physical Quantity</label>
                <input
                  type="number"
                  min="0"
                  value={form.physical_quantity}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      physical_quantity: e.target.value
                    })
                  }
                  placeholder="77"
                />
              </div>

              <div className="form-group form-wide">
                <label>Reason</label>
                <input
                  value={form.reason}
                  onChange={(e) =>
                    setForm({ ...form, reason: e.target.value })
                  }
                  placeholder="Damaged stock"
                />
              </div>
            </div>

            <button className="primary-btn" disabled={saving}>
              {saving ? "Creating..." : "Create Adjustment"}
            </button>
          </form>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

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
