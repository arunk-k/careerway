import { useDispatch, useSelector } from 'react-redux';
import './Explore.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchUserCareers } from '../../../redux/user/userCareer/userCareerThunks';

const Explore = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserCareers());
  }, [dispatch]);

  const { careers } = useSelector((state) => state.userCareerSlice);

  return (
    <div className="container py-5 explore-page">
      <h2 className="text-center fw-bold mb-2" style={{ color: "#4bb2db" }}>
        Explore Career Paths
      </h2>
      <p className="text-center text-muted mb-4">
        Choose a category to start your journey
      </p>
            {/* Smart Suggest Button */}
      <div className="text-center mb-5">
        <Link to="/suggest-careers" className="btn btn-outline-primary px-4 py-2">
         <i class="fa-solid fa-lightbulb fa-lg"></i> Get Smart Career Suggestions
        </Link>
      </div>

      <div className="row g-4">
        {careers.length > 0 ? (
          careers.map((item, idx) => (
            <div className="col-sm-6 col-lg-4" key={idx}>
              <Link to={`/career-roadmap/${item._id}`} className="text-decoration-none">
                <div className="explore-card shadow-sm text-center p-4 rounded">
                  <i className={`fa-solid ${item.icon} fa-2x text-info mb-3`}></i>
                  <h5 className="card-title text-dark">{item.title}</h5>
                  <p className="card-text">Explore roadmap and resources for {item.title}</p>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <h4 className="text-center text-info">No careers available</h4>
        )}
      </div>
    </div>
  );
};

export default Explore;
