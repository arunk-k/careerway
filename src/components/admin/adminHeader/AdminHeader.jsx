import { useEffect, useState } from 'react';
import './AdminHeader.css';

function AdminHeader() {
  const [admin, setAdmin] = useState('');
 
  useEffect(() => {
    if (sessionStorage.getItem("adminName")) {
      setAdmin(sessionStorage.getItem("adminName"));
    }
  }, []);


  return (
    <div className="admin-header d-flex justify-content-between align-items-center px-4 py-3">
      <div>
        <h5 className="mb-0">Welcome, {admin}</h5>
      </div>
      <span className="badge bg-info ms-2">Admin Panel</span>
    </div>
  );
}

export default AdminHeader;
