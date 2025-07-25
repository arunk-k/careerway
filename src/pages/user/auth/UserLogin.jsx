import { useContext, useState } from 'react';
import './UserLogin.css';
import { Link, useNavigate } from 'react-router-dom';
import { LoginUser } from '../../../services/userService';
import toast from 'react-hot-toast';
import { AuthContextUser } from '../../../context/UserAuthContext'; // ✅ Add this line

const UserLogin = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const nav = useNavigate();

  const { setUserAuthStatus } = useContext(AuthContextUser); // ✅ use context

  const handleLogin = async () => {
    const { email, password } = userData;
    if (email && password) {
      try {
        const response = await LoginUser(userData);
        console.log(response);
        if (response.status === 200) {
          toast.success("Login Successful");
          sessionStorage.setItem("token", response.data.token);
          sessionStorage.setItem("userName", response.data.user.fullName)
          setUserAuthStatus(true)
          nav('/');
        }
      } catch (err) {
        console.error(err);
        if (err.response?.status === 401) {
          toast.error("Invalid credentials!");
        } else {
          toast.error("Something went wrong!!");
        }
      }
    } else {
      toast("⚠️ Enter Valid Inputs!!");
    }
  };

  return (
    <div className="login-page d-flex align-items-center justify-content-center">
      <div className="login-card shadow p-4 rounded-4">
        <h2 style={{ color: "#0890c6" }} className="text-center mb-4">Welcome Back</h2>
        <p className="text-center text-muted mb-4">Login to your CareerWay account</p>

        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            onChange={e => setUserData({ ...userData, email: e.target.value })}
            type="email"
            className="form-control"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            onChange={e => setUserData({ ...userData, password: e.target.value })}
            className="form-control"
            placeholder="Enter your password"
          />
        </div>

        <div className="mb-3 d-flex justify-content-between align-items-center">
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="rememberMe" />
            <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
          </div>
          <Link to="/forgot" className="small text-primary">Forgot password?</Link>
        </div>

        <button id="logBtn" onClick={handleLogin} className="btn text-light w-100">Login</button>

        <p className="mt-4 text-center">
          Don’t have an account? <Link to="/register" className="text-primary">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
