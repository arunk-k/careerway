// CareerLearnRoadmap.jsx
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CareerLearnRoadmap.css';
import { fetchUserRoadmaps } from '../../../redux/user/userRoadmap/userRoadmapThunk';

const CareerLearnRoadmap = () => {
  const { careerId } = useParams();
  const dispatch = useDispatch();

  const { roadmaps, loading } = useSelector(state => state.userRoadmapSlice);
  const career = useSelector(state =>
    state.userCareerSlice.careers.find(c => c._id === careerId)
  );

  useEffect(() => {
    if (careerId) {
      dispatch(fetchUserRoadmaps(careerId)).then((res) => {
        console.log("Fetched roadmap:", res.payload); // Check what data is coming
      });
    }
  }, [careerId, dispatch]);


  const sortedRoadmaps = [...roadmaps].sort((a, b) => a.order - b.order); // ✅ Optional: ensure sorted steps

  return (
    <div className="container py-5 roadmap-page">
      {career && (
        <>
          <h2 style={{color:"#2183a6"}} className="text-center fw-bold mb-2 ">{career.title}</h2>
          <p className="text-center text-muted mb-4">{career.description}</p>
        </>
      )}

      <div className="timeline">
        {loading ? (
          <p className="text-center text-secondary">Loading...</p>
        ) : sortedRoadmaps.length > 0 ? (
          sortedRoadmaps.map((step, idx) => (
            <div key={idx} className="timeline-step">
              <div className="step-number">{step.order}</div>
              <div className="step-content">
                <h5  className="step-title">{step.stepTitle}</h5>
                <p className="step-description">{step.stepDescription}</p>
                <a href={step.youtubeLink} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary mt-2">
                  Watch Video
                </a>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-info">No roadmap steps available</p>
        )}
      </div>
    </div>
  );
};

export default CareerLearnRoadmap;
