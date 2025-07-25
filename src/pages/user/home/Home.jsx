import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="container-fluid px-5 py-2">
      {/* Hero Section */}
      <div style={{background: "#f0fbff"}} className="row align-items-center hero-section">
        {/* Left: Text */}
        <div className="col-md-6 mb-4 mb-md-0">
          <h1 style={{ color: "#0890c6" }} className="fw-bold">CareerWay</h1>
          <p className="lead text-dark">
            Your smart career guide to choose the right path and build your future.
          </p>
          <div className="d-flex gap-3 mt-4">
            <Link style={{backgroundColor:"#0890c6",color:"white"}} to="/explore" className="btn">Explore Career Paths</Link>
            <Link to="/profile" className="btn profile-btn">Go to Profile</Link>
          </div>
        </div>

        {/* Right: Image */}
        <div className="col-md-6 text-center">
          <img
            src="https://www.shutterstock.com/image-photo/elearning-technology-webinar-online-education-600nw-2324449597.jpg"
            alt="Career Guidance"
            className="img-fluid rounded"
          />
        </div>
      </div>

      {/* Features Section */}
      <section className="features-section">
        <h2>What You Can Do</h2>
        <div className="features-grid mb-3">
          <div className="feature-card">
            <i className="fa-solid fa-road"></i>
            <h3>Career Roadmaps</h3>
            <p>Visual step-by-step roadmap to learn skills for your dream career.</p>
          </div>
          <div className="feature-card">
            <i className="fa-solid fa-lightbulb"></i>
            <h3>Smart Suggestions</h3>
            <p>Personalized career suggestions based on your interests.</p>
          </div>
          <div className="feature-card">
            <i className="fa-solid fa-graduation-cap"></i>
            <h3>Learn with Resources</h3>
            <p>Access YouTube videos and materials to gain skills efficiently.</p>
          </div>
          <div className="feature-card">
            <i className="fa-solid fa-file-pdf"></i>
            <h3>Resume Generator</h3>
            <p>Create a professional resume and download it as PDF.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
