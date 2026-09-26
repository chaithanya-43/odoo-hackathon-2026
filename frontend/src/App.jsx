import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />

        <div className="app-body">
          <Sidebar />

          <main className="main-content">
            <Routes>
              <Route
                path="/"
                element={
                  <div>
                    <h1>Dashboard</h1>
                    <p>Welcome to StockSense Inventory Management System.</p>
                  </div>
                }
              />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App