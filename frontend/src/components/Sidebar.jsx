import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../services/api";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-title">StockSense</div>

      <nav>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/receipts">Receipts</NavLink>
        <NavLink to="/deliveries">Deliveries</NavLink>
        <NavLink to="/transfers">Internal Transfers</NavLink>
        <NavLink to="/adjustments">Inventory Adjustments</NavLink>
        <NavLink to="/ledger">Move History</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </nav>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;
