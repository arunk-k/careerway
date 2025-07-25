
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/admin/sidebar/Sidebar'
import AdminHeader from '../components/admin/adminHeader/AdminHeader'
import './AdminLayout.css'

function AdminLayout() {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <AdminHeader />
        <main className="admin-content">
          <Outlet /> 
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
