import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import './AddCareer.css';

import { useDispatch, useSelector } from 'react-redux';
import { addCareer } from '../../../../redux/admin/adminCareer/adminCareerThunks';

function AddCareer() {

  const { careers } = useSelector(state => state.adminCareerSlice);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ title: '', description: '', icon: '', path: '', category: '', })
  const [interests, setInterests] = useState([]);
  const [interestInput, setInterestInput] = useState('')


  const nav = useNavigate();

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
      const data = { ...formData, interests };
      // console.log(data)
      const isDuplicate = careers.some((career) => career.title.toLowerCase() === formData.title.toLowerCase() || career.path.toLowerCase() === formData.path.toLowerCase())

      if (isDuplicate) {
        toast.error("Career with same title or path already exists");
        return;
      }
      const response = await dispatch(addCareer(data)).unwrap();
      console.log(response)
      if (response && response._id) {
        toast.success("Career Added Successfully!");
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
        <h3 className="mb-0">Add New Career</h3>
        <p className="mb-0">Fill out the form to create a new career path</p>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                onChange={e => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Icon (URL)</label>
              <input
                type="text"
                className="form-control"
                onChange={e => setFormData({ ...formData, icon: e.target.value })}
              />
            </div>
            <div className="col-12">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                rows="3"
                onChange={e => setFormData({ ...formData, description: e.target.value })}
              ></textarea>
            </div>
            <div className="col-md-6">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                onChange={e => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="">-- Select Category --</option>
                <option value="Animation">Animation</option>
                <option value="Biology">Biology</option>
                <option value="Branding">Branding</option>
                <option value="CAD">CAD</option>
                <option value="Caregiving">Caregiving</option>
                <option value="Cloud Platforms">Cloud Platforms</option>
                <option value="Communication">Communication</option>
                <option value="Creativity">Creativity</option>
                <option value="Critical Thinking">Critical Thinking</option>
                <option value="Data Mining">Data Mining</option>
                <option value="Data Visualization">Data Visualization</option>
                <option value="Databases">Databases</option>
                <option value="Detail Orientation">Detail Orientation</option>
                <option value="DevOps">DevOps</option>
                <option value="Empathy">Empathy</option>
                <option value="Ethical Hacking">Ethical Hacking</option>
                <option value="Helping Others">Helping Others</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Innovation">Innovation</option>
                <option value="Leadership">Leadership</option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Mechanics">Mechanics</option>
                <option value="Mobile Platforms">Mobile Platforms</option>
                <option value="Patience">Patience</option>
                <option value="Physics">Physics</option>
                <option value="Planning">Planning</option>
                <option value="Problem Solving">Problem Solving</option>
                <option value="Programming">Programming</option>
                <option value="Psychology">Psychology</option>
                <option value="Public Speaking">Public Speaking</option>
                <option value="Python">Python</option>
                <option value="Research">Research</option>
                <option value="Risk-taking">Risk-taking</option>
                <option value="Security">Security</option>
                <option value="Software Architecture">Software Architecture</option>
                <option value="Statistics">Statistics</option>
                <option value="Subject Knowledge">Subject Knowledge</option>
                <option value="Teamwork">Teamwork</option>
                <option value="Typography">Typography</option>
                <option value="UI Design">UI Design</option>
                <option value="UI/UX">UI/UX</option>
                <option value="User Research">User Research</option>
                <option value="Web Development">Web Development</option>
                <option value="Wireframing">Wireframing</option>
                <option value="Writing">Writing</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Path</label>
              <input
                type="text"
                className="form-control"
                onChange={e => setFormData({ ...formData, path: e.target.value })}
              />
            </div>
            <div className="col-12">
              <label className="form-label">Interests</label>
              <div className="d-flex flex-wrap gap-2 mb-2">
                {interests.map((item, index) => (
                  <span key={index} className="badge bg-primary">
                    {item}
                    <button
                      type="button"
                      className="btn-close btn-close-white btn-sm ms-2"
                      onClick={() => removeInterest(index)}
                    ></button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Type interest and press Enter"
                value={interestInput}
                onChange={(e) => setInterestInput(e.target.value)}
                onKeyDown={handleInterestKeyDown}
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

export default AddCareer;
