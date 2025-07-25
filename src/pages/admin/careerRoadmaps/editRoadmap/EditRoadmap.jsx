import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { updateRoadmap } from '../../../../redux/admin/adminRoadmap/adminRoadmapThunks';
import './EditRoadmap.css';

function EditRoadmapStep() {
  const { stepId, careerId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { roadmaps } = useSelector(state => state.adminRoadmapSlice);

  const [formData, setFormData] = useState({
    stepTitle: '',
    stepDescription: '',
    youtubeLink: '',
    order: 0
  });

  useEffect(() => {
    const step = roadmaps.find(s => s._id === stepId);
    if (step) {
      setFormData({
        stepTitle: step.stepTitle,
        stepDescription: step.stepDescription,
        youtubeLink: step.youtubeLink,
        order: step.order
      });
    }
  }, [stepId, roadmaps]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateRoadmap({ id: stepId, updatedData: formData })).unwrap();
      toast.success('Step updated successfully');
      navigate(`/admin/careers/${careerId}/roadmap`);
    } catch {
      toast.error('Failed to update step');
    }
  };

  return (
    <div className="roadmap-form-page">
      <div className="form-card">
        <h3 className="text-center text-primary mb-4">Edit Roadmap Step</h3>
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
            <button type="submit" className="btn btn-success px-5 rounded-pill">Update Step</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditRoadmapStep;
