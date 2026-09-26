import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import ProductForm from "./pages/ProductForm";
import Receipts from "./pages/Receipts";
import Deliveries from "./pages/Deliveries";
import Transfers from "./pages/Transfers";
import Adjustments from "./pages/Adjustments";
import Ledger from "./pages/Ledger";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Authentication */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* Products */}
        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/products/new"
          element={<ProductForm />}
        />

        <Route
          path="/products/edit/:id"
          element={<ProductForm />}
        />

        {/* Inventory Operations */}
        <Route
          path="/receipts"
          element={<Receipts />}
        />

        <Route
          path="/deliveries"
          element={<Deliveries />}
        />

        <Route
          path="/transfers"
          element={<Transfers />}
        />

        <Route
          path="/adjustments"
          element={<Adjustments />}
        />

        {/* Stock Ledger */}
        <Route
          path="/ledger"
          element={<Ledger />}
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={<Profile />}
        />

        {/* Unknown URL */}
        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;