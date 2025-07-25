// src/pages/admin/RoadmapDashboard.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./RoadmapDashboard.css";
import { fetchCareers } from "../../../redux/admin/adminCareer/adminCareerThunks";

function RoadmapDashboard() {
  const dispatch = useDispatch();
  const { careers, loading, error } = useSelector((state) => state.adminCareerSlice);

  useEffect(() => {
    dispatch(fetchCareers());
  }, [dispatch]);

  return (
    <div className="container py-5 roadmap-page">
      <h2 style={{color:"#2183a6"}} className="text-center fw-bold mb-2 ">Manage Roadmaps</h2>
      <p className="text-center text-muted mb-4">Select a career to manage its roadmap</p>

      {loading && <p className="text-center">Loading careers...</p>}
      {error && <p className="text-center text-danger">{error}</p>}

      <div className="row g-4">
        {careers.length > 0 ? (
          careers.map((career) => (
            <div className="col-sm-6 col-lg-4" key={career._id}>
              <div className="roadmap-card text-center shadow-sm p-4 h-100">
                <i className={`fa-solid ${career.icon} fa-2x text-info mb-3`}></i>
                <h5 className="text-dark">{career.title}</h5>
                <p className="text-muted">{career.description}</p>
                <Link
                  to={`/admin/careers/${career._id}/roadmap`}
                  className="btn btn-outline-primary mt-2"
                >
                  Manage Roadmap
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-info">No careers found</p>
        )}
      </div>
    </div>
  );
}

export default RoadmapDashboard;
