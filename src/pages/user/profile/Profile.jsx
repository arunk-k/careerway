import { useEffect, useState } from 'react';
import './Profile.css';
import { getUserProfileApi } from '../../../services/userService';
import { baseUrl } from '../../../components/common/baseUrl';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('');

  // Load username from sessionStorage
  useEffect(() => {
    const storedName = sessionStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  // Load user data from API
  useEffect(() => {
    getUserProfileApi()
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
      });
  }, []);

  return (
    <div className="container py-5 profile-page">
      <div className="row justify-content-center">
        <div className="col-md-8">
          {/* Profile Info Card */}
          <div className="card shadow-sm p-4 rounded-4">
            {!user ? (
              <div className="text-center py-5">Loading your profile...</div>
            ) : (
              <div className="d-flex align-items-center gap-4 flex-column flex-md-row">
                <img
                  src={
                    user.profileImage
                      ? `${baseUrl}image/${user.profileImage}`
                      : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="Profile"
                  className="profile-img"
                />
                <div className="text-start">
                  <h3 style={{ color: "#0890c6" }}>{userName}</h3>
                  <p className="text-muted mb-1" style={{ fontSize: "17px" }}>
                    Email: {user.email}
                  </p>
                  <p className="text-muted mb-1" style={{ fontSize: "17px" }}>
                    Career Goal: Full Stack Developer
                  </p>
                  <p className="text-muted" style={{ fontSize: "17px" }}>
                    Location: Kozhikode, Kerala
                  </p>
                  <div className="d-flex gap-2 mt-2">
                    <button className="custom-btn primary-btn">Edit Profile</button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Career Paths Card */}
          <div className="card text-start shadow-sm p-4 rounded-4 mt-4">
            <h5 className="mb-3 fw-bold">Your Career Paths</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">🧑‍💻 MERN Full Stack Developer</li>
              <li className="list-group-item">🎨 UI/UX Designer</li>
              <li className="list-group-item">📊 Data Analyst</li>
            </ul>
          </div>

          {/* Resume Button */}
          <div className="text-center mt-4">
            <button className="custom-btn resume-btn">Download Resume (PDF)</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
