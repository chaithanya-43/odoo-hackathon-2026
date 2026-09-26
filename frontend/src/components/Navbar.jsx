function Navbar() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <header className="navbar">
      <div>
        <strong>Inventory Management</strong>
      </div>

      <div className="navbar-user">
        {user?.name || user?.email || "User"}
      </div>
    </header>
  );
}

export default Navbar;
