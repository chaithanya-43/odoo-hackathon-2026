import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import {
  createProduct,
  getProduct,
  updateProduct
} from "../services/api";

function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editing = Boolean(id);

  const [form, setForm] = useState({
    name: "",
    sku: "",
    category_id: "",
    uom: "",
    reorder_level: "",
    initial_stock: "",
    location_id: ""
  });

  const [loading, setLoading] = useState(editing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!editing) return;

    const load = async () => {
      try {
        const response = await getProduct(id);
        const p = response?.data || {};

        setForm({
          name: p.name || "",
          sku: p.sku || "",
          category_id: p.category_id ?? "",
          uom: p.uom || "",
          reorder_level: p.reorder_level ?? "",
          initial_stock: p.initial_stock ?? "",
          location_id: p.location_id ?? ""
        });
      } catch (err) {
        setError(err.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id, editing]);

  const handleChange = (event) => {
    setForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name || !form.sku || !form.category_id || !form.uom) {
      setError("Name, SKU, category and unit are required.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        name: form.name,
        sku: form.sku,
        category_id: Number(form.category_id),
        uom: form.uom,
        reorder_level: Number(form.reorder_level || 0)
      };

      if (!editing) {
        payload.initial_stock = Number(form.initial_stock || 0);
        payload.location_id = Number(form.location_id || 1);
      }

      if (editing) {
        await updateProduct(id, payload);
        setSuccess("Product updated successfully.");
      } else {
        await createProduct(payload);
        setSuccess("Product created successfully.");
        setTimeout(() => navigate("/products"), 500);
      }
    } catch (err) {
      setError(err.message || "Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-area">
        <Navbar />

        <main className="page-content">
          <div className="page-header">
            <div>
              <h1>{editing ? "Edit Product" : "Create Product"}</h1>
              <p>
                {editing
                  ? "Update product information"
                  : "Add a new product to inventory"}
              </p>
            </div>

            <Link className="secondary-btn" to="/products">
              Back
            </Link>
          </div>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          {loading ? (
            <div className="table-message">Loading product...</div>
          ) : (
            <form className="form-card" onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Product Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Steel Rod"
                  />
                </div>

                <div className="form-group">
                  <label>SKU</label>
                  <input
                    name="sku"
                    value={form.sku}
                    onChange={handleChange}
                    placeholder="STL-001"
                  />
                </div>

                <div className="form-group">
                  <label>Category ID</label>
                  <input
                    type="number"
                    min="1"
                    name="category_id"
                    value={form.category_id}
                    onChange={handleChange}
                    placeholder="1"
                  />
                </div>

                <div className="form-group">
                  <label>Unit of Measure</label>
                  <input
                    name="uom"
                    value={form.uom}
                    onChange={handleChange}
                    placeholder="pcs"
                  />
                </div>

                <div className="form-group">
                  <label>Reorder Level</label>
                  <input
                    type="number"
                    min="0"
                    name="reorder_level"
                    value={form.reorder_level}
                    onChange={handleChange}
                  />
                </div>

                {!editing && (
                  <>
                    <div className="form-group">
                      <label>Initial Stock</label>
                      <input
                        type="number"
                        min="0"
                        name="initial_stock"
                        value={form.initial_stock}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label>Location ID</label>
                      <input
                        type="number"
                        min="1"
                        name="location_id"
                        value={form.location_id}
                        onChange={handleChange}
                        placeholder="1"
                      />
                    </div>
                  </>
                )}
              </div>

              <button
                className="primary-btn"
                type="submit"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : editing
                    ? "Update Product"
                    : "Create Product"}
              </button>
            </form>
          )}
        </main>
      </div>
    </div>
  );
}

export default ProductForm;
