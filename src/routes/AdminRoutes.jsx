import { Routes, Route } from 'react-router-dom'
import AdminLayout from '../layout/AdminLayout'
import Dashboard from '../pages/admin/dashboard/Dashboard'
import Careers from '../pages/admin/careers/Careers'
import AdminLogin from '../pages/admin/auth/AdminLogin'
import AddCareer from '../pages/admin/careers/addCareers/AddCareer'
import EditCareer from '../pages/admin/careers/editCareers/EditCareer'
import CareerRoadmaps from '../pages/admin/careerRoadmaps/CareerRoadmaps'
import { useContext } from 'react'
import { AuthContextAdmin } from '../context/AdminAuthContext'
import RoadmapDashboard from '../pages/admin/careerRoadmaps/RoadmapDashboard'
import AddRoadmap from '../pages/admin/careerRoadmaps/addRoadmap/AddRoadmap'
import EditRoadmapStep from '../pages/admin/careerRoadmaps/editRoadmap/EditRoadmap'
import UserManage from '../pages/admin/userManage/UserManage'


function AdminRoutes() {

  const { adminAuthStatus } = useContext(AuthContextAdmin)
  return (
    <>
      <Routes>
        <Route path="login" element={<AdminLogin />} />
        <Route path="/" element={adminAuthStatus ? <AdminLayout /> : <AdminLogin />}>
          <Route index element={<Dashboard />} />
          <Route path="careers" element={<Careers />} />
          <Route path="users" element={<UserManage />} />
          <Route path="careers/add" element={<AddCareer />} />
          <Route path="careers/edit/:id" element={<EditCareer />} />
          <Route path="careers/:id/roadmap" element={<CareerRoadmaps />} />
          <Route path="roadmaps" element={<RoadmapDashboard />} />
          <Route path="careers/:id/roadmap/add" element={<AddRoadmap />} />
          <Route path="careers/:careerId/roadmap/:stepId/edit" element={<EditRoadmapStep />} />
        </Route>
      </Routes>
    </>
  )
}
export default AdminRoutes



