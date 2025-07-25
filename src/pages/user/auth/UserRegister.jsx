import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './UserLogin.css';
import { RegisterUser } from '../../../services/userService';
import toast from 'react-hot-toast';

const UserRegister = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, email, password, confirmPassword } = formData;

    if (!fullName || !email || !password || !confirmPassword) {
      return toast("⚠️ All fields are required");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      const res = await RegisterUser({ fullName, email, password });
      if (res.status === 201 || res.status === 200) {
        toast.success("Registered successfully");
        nav('/login');
      }
    } catch (err) {
      console.error(err);
      if (err.response?.status === 409) {
        toast.error("Email already exists");
      } else {
        toast.error("Registration failed");
      }
    }
  };

  return (
    <div className="login-page d-flex align-items-center justify-content-center">
      <div className="login-card shadow p-4 rounded-4">
        <h2 style={{ color: "#0890c6" }} className="text-center mb-3">Join CareerWay+</h2>
        <p className="text-center text-muted mb-4">Create your account to get started</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-control" placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" className="form-control" placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" placeholder="Create a password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input type="password" className="form-control" placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} required />
          </div>

          <button type="submit" id="logBtn" className="btn text-light w-100">Register</button>
        </form>

        <p className="mt-4 text-center">
          Already have an account? <Link to="/login" className="text-primary">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default UserRegister;
