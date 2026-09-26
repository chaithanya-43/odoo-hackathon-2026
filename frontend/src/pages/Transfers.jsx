import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DataTable from "../components/DataTable";
import {
  createTransfer,
  getTransfers,
  validateTransfer
} from "../services/api";

const emptyForm = {
  reference_no: "",
  product_id: "",
  quantity: "",
  source_location_id: "",
  destination_location_id: ""
};

function Transfers() {
  const [transfers, setTransfers] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadTransfers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getTransfers();
      const data = response?.data;

      setTransfers(
        Array.isArray(data)
          ? data
          : data?.transfers || []
      );
    } catch (err) {
      setError(err.message || "Failed to load transfers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransfers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (
      !form.reference_no ||
      !form.product_id ||
      !form.quantity ||
      !form.source_location_id ||
      !form.destination_location_id
    ) {
      setError("Please fill all transfer fields.");
      return;
    }

    if (
      form.source_location_id === form.destination_location_id
    ) {
      setError("Source and destination locations must be different.");
      return;
    }

    try {
      setSaving(true);

      await createTransfer({
        reference_no: form.reference_no,
        source_location_id: Number(form.source_location_id),
        destination_location_id: Number(form.destination_location_id),
        items: [
          {
            product_id: Number(form.product_id),
            quantity: Number(form.quantity)
          }
        ]
      });

      setForm(emptyForm);
      setSuccess("Transfer created successfully.");
      await loadTransfers();
    } catch (err) {
      setError(err.message || "Failed to create transfer");
    } finally {
      setSaving(false);
    }
  };

  const handleValidate = async (row) => {
    const id = row.transfer_id ?? row.id;

    try {
      setError("");
      setSuccess("");

      await validateTransfer(id);

      setSuccess("Transfer validated successfully.");
      await loadTransfers();
    } catch (err) {
      setError(err.message || "Transfer validation failed");
    }
  };

  const status = (row) =>
    String(row.status || "").toLowerCase();

  const columns = [
    {
      key: "transfer_id",
      label: "ID",
      render: (row) => row.transfer_id ?? row.id ?? "-"
    },
    {
      key: "reference_no",
      label: "Reference"
    },
    {
      key: "source_location_id",
      label: "Source"
    },
    {
      key: "destination_location_id",
      label: "Destination"
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
              <h1>Internal Transfers</h1>
              <p>Move stock between locations</p>
            </div>
          </div>

          <form className="form-card" onSubmit={handleSubmit}>
            <h2>Create Transfer</h2>

            <div className="form-grid">
              <div className="form-group">
                <label>Reference No</label>
                <input
                  value={form.reference_no}
                  onChange={(e) =>
                    setForm({ ...form, reference_no: e.target.value })
                  }
                  placeholder="TRF-001"
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
                  placeholder="10"
                />
              </div>

              <div className="form-group">
                <label>Source Location ID</label>
                <input
                  type="number"
                  min="1"
                  value={form.source_location_id}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      source_location_id: e.target.value
                    })
                  }
                  placeholder="1"
                />
              </div>

              <div className="form-group">
                <label>Destination Location ID</label>
                <input
                  type="number"
                  min="1"
                  value={form.destination_location_id}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      destination_location_id: e.target.value
                    })
                  }
                  placeholder="2"
                />
              </div>
            </div>

            <button className="primary-btn" disabled={saving}>
              {saving ? "Creating..." : "Create Transfer"}
            </button>
          </form>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <div className="section-card">
            <h2>Transfer History</h2>

            <DataTable
              columns={columns}
              data={transfers}
              loading={loading}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Transfers;
