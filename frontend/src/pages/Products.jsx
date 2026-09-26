import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DataTable from "../components/DataTable";
import { getProducts } from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getProducts();
      const data = response?.data;

      setProducts(
        Array.isArray(data)
          ? data
          : data?.products || []
      );
    } catch (err) {
      setError(err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const filtered = products.filter((product) => {
    const value = search.toLowerCase();

    return (
      String(product.name || "").toLowerCase().includes(value) ||
      String(product.sku || "").toLowerCase().includes(value) ||
      String(product.category_name || product.category || "")
        .toLowerCase()
        .includes(value)
    );
  });

  const columns = [
    {
      key: "product_id",
      label: "ID",
      render: (row) => row.product_id ?? row.id ?? "-"
    },
    {
      key: "name",
      label: "Product"
    },
    {
      key: "sku",
      label: "SKU"
    },
    {
      key: "category_name",
      label: "Category",
      render: (row) =>
        row.category_name ?? row.category ?? "-"
    },
    {
      key: "uom",
      label: "Unit"
    },
    {
      key: "reorder_level",
      label: "Reorder Level"
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => {
        const productId = row.product_id ?? row.id;

        return (
          <Link
            className="table-action-btn"
            to={`/products/edit/${productId}`}
          >
            Edit
          </Link>
        );
      }
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
              <h1>Products</h1>
              <p>Manage inventory products</p>
            </div>

            <Link className="primary-btn" to="/products/new">
              + Create Product
            </Link>
          </div>

          <div className="filter-bar">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by product, SKU or category"
            />

            <button
              className="secondary-btn"
              onClick={loadProducts}
            >
              Refresh
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}

          <DataTable
            columns={columns}
            data={filtered}
            loading={loading}
          />
        </main>
      </div>
    </div>
  );
}

export default Products;
