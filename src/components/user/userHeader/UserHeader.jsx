import { useContext, useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './UserHeader.css';
import { AuthContextUser } from '../../../context/UserAuthContext';

const UserHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userAuthStatus, setUserAuthStatus } = useContext(AuthContextUser);
  const navigate = useNavigate();

const handleLogout = () => {
  sessionStorage.clear();
  setUserAuthStatus(false);
};


  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo-wrapper">
        <img src="/logo.svg" alt="CareerWay+ Logo" className="logo-img" />
      </div>

      {/* Desktop Nav */}
      <ul className="nav-links">
        <li><Link to="/"><i className="fa-solid fa-house" style={{ color: "#1fbcdb" }}></i> Home</Link></li>
        <li><Link to="/about"><i className="fa-solid fa-circle-info" style={{ color: "#1fbcdb" }}></i> About</Link></li>
        <li><Link to="/explore"><i className="fa-solid fa-compass" style={{ color: "#1fbcdb" }}></i> Explore</Link></li>
        <li><Link to="/profile"><i className="fa-solid fa-user" style={{ color: "#1fbcdb" }}></i> Profile</Link></li>
        {
          userAuthStatus ? (
            <li><button onClick={handleLogout} className="btn btn-outline-danger">Logout</button></li>
          ) : (
            <>
              <li><Link to="/login" className="btn btn-outline-primary">Login</Link></li>
              <li><Link to="/register" className="btn btn-primary">Register</Link></li>
            </>
          )
        }
      </ul>

      {/* Mobile Nav */}
      <ul className={`nav-drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <X className="close-icon" onClick={() => setIsOpen(false)} />
        </div>
        <li><Link to="/" onClick={() => setIsOpen(false)}><i className="fa-solid fa-house" style={{ color: "#1fbcdb" }}></i> Home</Link></li>
        <li><Link to="/about" onClick={() => setIsOpen(false)}><i className="fa-solid fa-circle-info" style={{ color: "#1fbcdb" }}></i> About</Link></li>
        <li><Link to="/explore" onClick={() => setIsOpen(false)}><i className="fa-solid fa-compass" style={{ color: "#1fbcdb" }}></i> Explore</Link></li>
        <li><Link to="/profile" onClick={() => setIsOpen(false)}><i className="fa-solid fa-user" style={{ color: "#1fbcdb" }}></i> Profile</Link></li>
        {
          userAuthStatus ? (
            <li>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="custom-outline-btn mx-5 d-flex justify-content-center"
              >
                Logout
              </button>
            </li>
          ) : (
            <>
              <li><Link to="/login" onClick={() => setIsOpen(false)} className="text-light custom-outline-btn mx-5 d-flex justify-content-center">Login</Link></li>
              <li><Link style={{ backgroundColor: "#0890c6" }} to="/register" onClick={() => setIsOpen(false)} className="btn text-light mx-5 d-flex justify-content-center">Register</Link></li>
            </>
          )
        }
      </ul>

      {/* Hamburger */}
      <div className={`menu-icon ${isOpen ? 'hide-icon' : ''}`} onClick={() => setIsOpen(true)}>
        <Menu />
      </div>
    </nav>
  );
};

export default UserHeader;
