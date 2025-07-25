import { useDispatch, useSelector } from 'react-redux';
import './Dashboard.css';
import { useEffect } from 'react';
import { fetchCareers } from '../../../redux/admin/adminCareer/adminCareerThunks';
import { fetchRoadmaps } from '../../../redux/admin/adminRoadmap/adminRoadmapThunks';
import { fetchUsers } from '../../../redux/admin/adminUser/adminUserThunks';

function Dashboard() {
  const dispatch = useDispatch();

  const { careers, loading: careerLoading } = useSelector((state) => state.adminCareerSlice);
  const { roadmaps, loading: roadmapLoading } = useSelector((state) => state.adminRoadmapSlice);
  const { users, loading: userLoading } = useSelector((state) => state.adminUserSlice);

  useEffect(() => {
    dispatch(fetchCareers());
    dispatch(fetchRoadmaps());
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Dashboard Overview</h2>
      <div className="dashboard-cards">
        <div className="card card-blue">
          <h5>Total Careers</h5>
          <p>{careerLoading ? 'Loading...' : careers.length}</p>
        </div>
        <div className="card card-green">
          <h5>Total Roadmaps</h5>
          <p>{roadmapLoading ? 'Loading...' : roadmaps.length}</p>
        </div>
        <div className="card card-orange">
          <h5>Learning Modules</h5>
          <p>68</p>
        </div>
        <div className="card card-red">
          <h5>Registered Users</h5>
          <p>{userLoading ? 'Loading...' : users.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
