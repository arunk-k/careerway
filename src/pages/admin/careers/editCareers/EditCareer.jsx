import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import './EditCareer.css';

import { useDispatch, useSelector } from 'react-redux';
import { fetchCareers, updateCareer } from '../../../../redux/admin/adminCareer/adminCareerThunks';


function EditCareer() {
  const { id } = useParams();
  console.log(id);

  const nav = useNavigate();
  const { careers } = useSelector(state => state.adminCareerSlice);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({ title: '', description: '', icon: '', path: '', category: '', })
  const [interests, setInterests] = useState([]);
  const [interestInput, setInterestInput] = useState('')

  useEffect(() => {
    if (careers.length == 0) {
      dispatch(fetchCareers())
    }
  }, [dispatch])

  useEffect(() => {
    if (careers.length > 0) {
      const selected = careers.find(item => item._id == id);
      if (selected) {
        setFormData(selected);
        setInterests(selected.interests || [])
      } else {
        alert("Careers not found!");
      }
    }
  }, [careers, id])


  const handleInterestKeyDown = (e) => {
    if (e.key === 'Enter' && interestInput.trim()) {
      e.preventDefault()
      const newInterest = interestInput.trim()
      if (!interests.includes(newInterest)) {
        setInterests([...interests, newInterest])
      }
      setInterestInput('')
    }
  }

  const removeInterest = (indexToRemove) => {
    setInterests(interests.filter((_, i) => i !== indexToRemove));
  }

  const handleSubmit = async () => {
    const { title, description, icon, path, category } = formData;
    if (title && description && icon && path && category) {
      const existing = careers.find(item => (item.title === title || item.path === path) && item._id !== id)
      if (existing) {
        toast.error("A career with this title or path already exists!");
        return
      }
      const updatedData = { ...formData, interests };
      // console.log(data)
      const response = await dispatch(updateCareer({ id, updatedData })).unwrap();
      console.log(response)
      if (response && response._id) {
        toast.success("Career Updated Successfully!");
        nav('/admin/careers');
      } else {
        toast.error("Something went wrong");
      }
    } else {
      alert("Please enter valid inputs!");
    }
  }

  return (
    <div className="add-career-page">
      <div className="add-career-header text-white px-4 py-3 rounded mb-4">
        <h3 className="mb-0">Edit New Career</h3>
        <p className="mb-0">Fill out the form to create a new career path</p>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Title</label>
              <input value={formData.title} type="text" className="form-control" onChange={e => setFormData({ ...formData, title: e.target.value })} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Icon (URL)</label>
              <input value={formData.icon} type="text" className="form-control" onChange={e => setFormData({ ...formData, icon: e.target.value })} />
            </div>
            <div className="col-12">
              <label className="form-label">Description</label>
              <textarea value={formData.description} className="form-control" rows="3" onChange={e => setFormData({ ...formData, description: e.target.value })}></textarea>
            </div>
            <div className="col-md-6">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
              >

                <option value="">-- Select Category --</option>
                <option value="IT">IT</option>
                <option value="Engineering">Engineering</option>
                <option value="Medical">Medical</option>
                <option value="Arts">Arts</option>
                <option value="Commerce">Commerce</option>
                <option value="Design">Design</option>
                <option value="Law">Law</option>
                <option value="Science">Science</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Path</label>
              <input value={formData.path} type="text" className="form-control" onChange={e => setFormData({ ...formData, path: e.target.value })} />
            </div>
            <div className="col-12">
              <label className="form-label">Interests</label>
              <div className="d-flex flex-wrap gap-2 mb-2">
                {interests.map((item, index) => (
                  <span key={index} className="badge bg-primary">
                    {item}
                    <button type="button" className="btn-close btn-close-white btn-sm ms-2" onClick={() => removeInterest(index)}></button>
                  </span>
                ))}
              </div>
              <input type="text" className="form-control" placeholder="Type interest and press Enter" value={interestInput} onChange={(e) => setInterestInput(e.target.value)} onKeyDown={handleInterestKeyDown}
              />
            </div>
            <div className="col-12 text-end">
              <button onClick={handleSubmit} className="btn btn-primary px-4">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCareer;
