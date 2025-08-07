import { Link } from 'react-router-dom';
import './UserFooter.css';

const UserFooter = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-section brand">
          <img src="/logo.svg" alt="CareerWay+ Logo" className="footer-logo" />
          <p>CareerWay is your personalized career guide, helping students discover, learn, and grow with the right skills.</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/explore">Explore</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Features</h4>
          <ul>
            <li><Link to="/explore">Explore Careers</Link></li>
            <li><Link to="/suggest-careers">Suggestions</Link></li>
            <li><a href="https://linkedin.com/in/arun-kk-/" target="_blank" rel="noopener noreferrer" aria-label="contactus">
              Contact Us
            </a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Connect</h4>
          <ul className="social-icons">
            <li><a href="https://linkedin.com/in/arun-kk-/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i className="fa-brands fa-linkedin"></i>
            </a>
            </li>
            <li><a href="http://github.com/arunk-k/" target="_blank" rel="noopener noreferrer" aria-label="guthub">
              <i className="fa-brands fa-github"></i>
            </a>
            </li>
            <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} CareerWay. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default UserFooter;
