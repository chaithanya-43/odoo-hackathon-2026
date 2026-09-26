import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1>StockSense</h1>
              <p>Inventory Management System</p>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App