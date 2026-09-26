import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DataTable from "../components/DataTable";
import { getProducts } from "../services/api";

function Products() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getProducts({
        search,
        category
      });

      const result = response?.data;

      setProducts(
        Array.isArray(result)
          ? result
          : result?.products || []
      );
    } catch (err) {
      setError(err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const columns = [
    {
      key: "name",
      label: "Product Name"
    },
    {
      key: "sku",
      label: "SKU"
    },
    {
      key: "category",
      label: "Category"
    },
    {
      key: "unitOfMeasure",
      label: "Unit"
    },
    {
      key: "stock",
      label: "Stock",
      render: (row) =>
        row.stock ??
        row.quantity ??
        row.currentStock ??
        0
    },
    {
      key: "location",
      label: "Location"
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <button
          className="table-action-btn"
          onClick={() =>
            navigate(`/products/edit/${row.id}`)
          }
        >
          Edit
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
              <h1>Products</h1>
              <p>Manage your inventory products</p>
            </div>

            <button
              className="primary-btn"
              onClick={() => navigate("/products/new")}
            >
              <i className="bx bx-plus"></i>
              Add Product
            </button>
          </div>

          <div className="filter-bar">

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={handleSearch}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  loadProducts();
                }
              }}
            />

            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />

            <button
              className="secondary-btn"
              onClick={loadProducts}
            >
              Search
            </button>

          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <DataTable
            columns={columns}
            data={products}
            loading={loading}
          />

        </main>
      </div>
    </div>
  );
}

export default Products;