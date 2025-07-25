// src/components/admin/sidebar/Sidebar.jsx
import './Sidebar.css'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContextAdmin } from '../../../context/AdminAuthContext';

function Sidebar() {
  const [open, setOpen] = useState(false)

  const navigate = useNavigate();
  const { setAdminAuthStatus } = useContext(AuthContextAdmin)


  const handleLogout = () => {
    sessionStorage.clear()
    setAdminAuthStatus(false)
    toast.success("User Logged Out!!")
    navigate('/admin/login');
  };

  return (
    <nav className={`admin-sidebar ${open ? 'open' : ''}`}>
      <div className="sidebar-toggle d-md-none mb-3" onClick={() => setOpen(!open)}>
        ☰
      </div>
      <div className="text-center mb-4">
        <img src="/logo.svg" alt="CareerWay+" className="sidebar-logo" />
      </div>

      <Link to="/admin" className="nav-link">Dashboard</Link>
      <Link to="/admin/careers" className="nav-link">Career Management</Link>
      <Link to="/admin/roadmaps" className="nav-link">Roadmap Management</Link>
      <Link to="/admin/users" className="nav-link">User Management</Link>
      <button onClick={handleLogout} className="nav-link logout-btn">Logout</button>
    </nav>
  )
}

export default Sidebar
