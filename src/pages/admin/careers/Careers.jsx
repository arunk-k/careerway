import { useEffect } from 'react';
import './Careers.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCareer, fetchCareers } from '../../../redux/admin/adminCareer/adminCareerThunks';

function Careers() {

  const { careers } = useSelector(state => state.adminCareerSlice)
  const dispatch = useDispatch()
  const nav = useNavigate()
  console.log(careers)

  useEffect(() => {
    dispatch(fetchCareers())
  }, [])

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteCareer(id)).unwrap();
    } catch (error) {
      console.log("Delete failed", error);
    }
  }
  const handleSubmit = () => {
    nav('/admin/careers/add')
  }

  return (
    <div className="careers-page">
      <div className="career-header text-white px-4 py-3 rounded mb-4">
        <h3 className="mb-0">Career Management</h3>
        <p className="mb-0">Manage all career paths offered in your platform</p>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">Available Careers</h5>
            <button onClick={handleSubmit}
              style={{ backgroundColor: "#2183a6", color: "white" }}
              className="btn rounded-pill px-4"
            >
              + Add Career
            </button>
          </div>

          <div className="table-responsive">
            <table className="table table-hover careers-table text-center">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Career Title</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {careers.length > 0 ? (
                  careers.map((career, index) => (
                    <tr key={career._id}>
                      <td>{index + 1}</td>
                      <td>{career.title}</td>
                      <td>{career.category}</td>
                      <td>
                        <Link to={`/admin/careers/edit/${career._id}`} className="btn btn-sm btn-outline-success me-2 rounded-pill">
                          Edit <i className="fa-solid fa-pen"></i>
                        </Link>
                        <button onClick={() => handleDelete(career._id)} className="btn btn-sm btn-outline-danger rounded-pill">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-muted">
                      No careers available
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

export default Careers;
