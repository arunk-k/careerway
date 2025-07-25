import './About.css';

const About = () => {
  return (
    <div className="container py-5 about-page">
      {/* Header Section */}
      <div className="text-center mb-5">
        <h1 style={{ color: "#0890c6" }}  className="fw-bold">About CareerWay</h1>
        <p className="text-muted lead mt-2">
          Empowering students to make the right career choices with guidance, roadmaps, and learning tools.
        </p>
      </div>

      {/* Mission and Vision Section */}
      <div className="row align-items-center mb-5">
        <div className="col-md-6 mb-4 mb-md-0">
          <img
            src="https://media.assettype.com/freepressjournal/2025-02-01/qxgm0blj/Untitled-design104.png"
            alt="Career Guidance"
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6">
          <h3 style={{ color: "#0890c6" }}  className="fw-semibold">Our Mission</h3>
          <p className="text-muted">
            At CareerWay, our mission is to provide personalized career guidance through interactive tools and curated learning resources. 
            We aim to help students understand various career paths, learn the required skills, and build their professional profile.
          </p>
        </div>
      </div>


      {/* Final Note */}
      <div className="text-center">
        <h4 style={{ color: "#0890c6" }} >Start your career journey with us today.</h4>
        <p className="text-muted">CareerWay is more than a guide — it's your career companion.</p>
      </div>
    </div>
  );
};

export default About;
