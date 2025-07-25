import { useContext, useState } from 'react';
import './AdminLogin.css';
import { LoginAdmin } from '../../../services/adminService';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContextAdmin } from '../../../context/AdminAuthContext';


const AdminLogin = () => {

  const [adminData, setAdminData] = useState({ email: "", password: "" })
  const nav = useNavigate()
  const{setAdminAuthStatus}=useContext(AuthContextAdmin)


  const handleLogin = async () => {
    const { email, password } = adminData;
    if (email && password) {
      try {
        const response = await LoginAdmin(adminData);
        console.log(response);
        if (response.status === 200) {
          toast.success("Login Successful");
          sessionStorage.setItem("admintoken", response.data.token);
          sessionStorage.setItem("adminName", response.data.user.fullName);
          setAdminAuthStatus(true)
          nav('/admin');
        }
      } catch (err) {
        console.error(err);
        if (err.response?.status === 401) {
          toast.error("Invalid credentials!");
        }
        else
          toast.error("Something went wrong!!");

      }
    }
    else
      toast("⚠️ Enter Valid Inputs!!");

  }



  return (
    <div className="admin-login-page d-flex align-items-center justify-content-center">
      <div className="admin-login-card shadow p-4 rounded-4">
        <h2 style={{ color: "#0890c6" }} className="text-center mb-4">Admin Portal</h2>
        <p className="text-center text-muted mb-4">Login to manage CareerWay+</p>

        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="email" className="form-control" placeholder="Enter admin email" onChange={e => setAdminData({ ...adminData, email: e.target.value })} 
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" placeholder="Enter password" onChange={e => setAdminData({ ...adminData, password: e.target.value })} required />
        </div>

        <button onClick={handleLogin} id="adminLogBtn"  className="btn text-light w-100">Login</button>
      </div>
    </div>
  );
};

export default AdminLogin;
