import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './SuggestCareers.css';
import { fetchUserCareers } from '../../../redux/user/userCareer/userCareerThunks';
import { fetchUserSuggestedCareers } from '../../../redux/user/userSuggestCareer/userSuggestCareerThunks';

function SuggestCareers() {
  const dispatch = useDispatch();

  const { careers, loading: careersLoading } = useSelector(state => state.userCareerSlice);
  const { suggestedCareers, loading: suggestLoading, error } = useSelector(state => state.userSuggestCareerSlice);

  const [selectedInterests, setSelectedInterests] = useState([]);
  const [uniqueInterests, setUniqueInterests] = useState([]);

  useEffect(() => {
    dispatch(fetchUserCareers());
  }, [dispatch]);

  useEffect(() => {
    if (careers.length > 0) {
      const allInterests = careers.flatMap(career => career.interests || []);
      const unique = [...new Set(allInterests)];
      setUniqueInterests(unique);
    }
  }, [careers]);

  const toggleInterest = (interest) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSuggest = () => {
    if (selectedInterests.length === 0) return;
    dispatch(fetchUserSuggestedCareers(selectedInterests));
  };

  return (
    <div className="container my-4 suggest-page">
      <div className="text-center mb-4">
        <h2 style={{ color: "#4bb2db" }} className="fw-bold">Career Suggestion</h2>
        <p className="text-muted">Select your interests to get personalized career suggestions</p>
      </div>

      {careersLoading ? (
        <p className="text-center">Loading interests...</p>
      ) : (
        <>
          <div className="row justify-content-center">
            {uniqueInterests.map((interest, idx) => (
              <div
                key={idx}
                className="col-6 col-sm-4 col-md-3 mb-3"
                onClick={() => toggleInterest(interest)}
              >
                <div
                  className={`interest-card text-center p-3 shadow-sm rounded-4 ${
                    selectedInterests.includes(interest) ? 'selected' : ''
                  }`}
                  style={{ cursor: 'pointer' }}
                >
                  <span className="fw-semibold">{interest}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mb-4">
            <button
              onClick={handleSuggest}
              className="btn btn-success px-4"
              disabled={selectedInterests.length === 0 || suggestLoading}
            >
              {suggestLoading ? 'Loading...' : 'Suggest Careers'}
            </button>
          </div>

          <div className="row">
            {error && <p className="text-danger text-center">{error}</p>}

            {!suggestLoading && suggestedCareers.length > 0 ? (
              suggestedCareers.map((career, idx) => (
                <div className="col-md-6 col-lg-4 mb-4" key={idx}>
                  <Link to={`/career-roadmap/${career._id}`} className="text-decoration-none">
                    <div className="card h-100 border-0 shadow-sm hover-zoom">
                      <div className="card-body">
                        <h5 className="card-title">
                          <i className={`fa-solid ${career.icon} text-info me-2`}></i>
                          {career.title}
                        </h5>
                        <p className="card-text text-muted">{career.description}</p>
                        <span className="badge bg-secondary">{career.category}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              !suggestLoading && (
                <div className="text-center">
                  <p className="text-muted">No matching careers found. Try selecting different interests.</p>
                </div>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default SuggestCareers;
