import { useEffect } from 'react';
import './CareerRoadmaps.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRoadmap, fetchRoadmaps } from '../../../redux/admin/adminRoadmap/adminRoadmapThunks';

function CareerRoadmaps() {
  const { id: careerId } = useParams(); // this is the career id
  console.log("careerId from URL:", careerId);
  const { roadmaps, loading } = useSelector(state => state.adminRoadmapSlice)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (careerId) dispatch(fetchRoadmaps(careerId));
  }, [careerId, dispatch]);

  const handleAdd = () => {
    navigate(`/admin/careers/${careerId}/roadmap/add`);
  };

   const handleDelete = async (id) => {
     try {
       await dispatch(deleteRoadmap(id)).unwrap()
     } catch (error) {
       console.log("Delete failed", error);
     }
   }

  return (
    <div className="roadmap-page">
      <div className="roadmap-header text-white px-4 py-3 rounded mb-4">
        <h3 className="mb-0">Roadmap Management</h3>
        <p className="mb-0">Manage learning steps under this career</p>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">Steps in this Career Path</h5>
            <button style={{ background: 'linear-gradient(to right, #2183a6, #195c83)' }} onClick={handleAdd} className="btn text-light rounded-pill px-4">
              + Add Step
            </button>
          </div>

          <div className="table-responsive">
            <table className="table table-hover roadmap-table text-center">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Step Title</th>
                  <th>Video Link</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {roadmaps && roadmaps.length > 0 ? (
                  roadmaps.map((step, index) => (
                    <tr key={step._id}>
                      <td>{index + 1}</td>
                      <td>{step.stepTitle}</td>
                      <td>
                        <a href={step.youtubeLink} target="_blank" rel="noreferrer">Watch</a>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-success me-2 rounded-pill"
                          onClick={() => navigate(`/admin/careers/${careerId}/roadmap/${step._id}/edit`)}
                        >
                          Edit <i className="fa-solid fa-pen"></i>
                        </button>
                        <button
                          onClick={() => handleDelete(step._id)}
                          className="btn btn-sm btn-outline-danger rounded-pill"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-muted">
                      {loading ? "Loading steps..." : "No steps added yet"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CareerRoadmaps;
