import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <aside className="sidebar">
      <nav>
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/receipts">Receipts</NavLink>
        <NavLink to="/deliveries">Deliveries</NavLink>
        <NavLink to="/transfers">Internal Transfers</NavLink>
        <NavLink to="/adjustments">Inventory Adjustments</NavLink>
        <NavLink to="/ledger">Move History</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </nav>
    </aside>
  )
}

export default Sidebar