import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import AdminRoutes from './routes/AdminRoutes'
import UserRoutes from './routes/UserRoutes'


function App() {
  return (
    <>
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/*" element={<UserRoutes />} />
      </Routes>
      <Toaster />
    </>
  )
}
export default App
