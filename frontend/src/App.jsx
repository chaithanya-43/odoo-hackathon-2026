import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Login from './pages/Login'
import Signup from './pages/Signup'

function DashboardPlaceholder() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>StockSense Inventory Management System</p>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/*"
          element={
            <div className="app">
              <Navbar />

              <div className="app-body">
                <Sidebar />

                <main className="main-content">
                  <Routes>
                    <Route path="/" element={<DashboardPlaceholder />} />
                  </Routes>
                </main>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App