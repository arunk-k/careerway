import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addRoadmap } from "../../../../redux/admin/adminRoadmap/adminRoadmapThunks";
import './AddRoadmap.css';

function AddRoadmap() {
  const { id: careerId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    stepTitle: "",
    stepDescription: "",
    youtubeLink: "",
    order: ""
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const roadmapData = {
      careerId,
      ...formData,
      order: formData.order ? parseInt(formData.order) : 0,
    };

    await dispatch(addRoadmap(roadmapData));
    navigate(`/admin/careers/${careerId}/roadmap`);
  };

  return (
    <div className="roadmap-form-page">
      <div className="form-card">
        <h3 className="text-center text-primary mb-4">Add Roadmap Step</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Step Title *</label>
            <input type="text" name="stepTitle" className="form-control" value={formData.stepTitle} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label>Description</label>
            <textarea name="stepDescription" className="form-control" rows="3" value={formData.stepDescription} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label>YouTube Link</label>
            <input type="url" name="youtubeLink" className="form-control" value={formData.youtubeLink} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label>Order</label>
            <input type="number" name="order" className="form-control" value={formData.order} onChange={handleChange} />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary px-5 rounded-pill">Add Step</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRoadmap;
