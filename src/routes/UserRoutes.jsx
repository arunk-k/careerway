import { Route, Routes } from 'react-router-dom'
import UserHeader from '../components/user/userHeader/UserHeader'
import Home from '../pages/user/home/Home'
import Explore from '../pages/user/explore/Explore'
import UserLogin from '../pages/user/auth/UserLogin'
import UserRegister from '../pages/user/auth/UserRegister'
import CareerLearnRoadmap from '../pages/user/careerLearnRoadmap/CareerLearnRoadmap'
import SuggestCareers from '../pages/user/suggestCareers/SuggestCareers'
import UserFooter from '../components/user/userFooter/UserFooter'
import Profile from '../pages/user/profile/Profile'
import { AuthContextUser } from '../context/UserAuthContext'
import { useContext } from 'react'
import About from '../pages/user/about/About'

function UserRoutes() {
    const { userAuthStatus } = useContext(AuthContextUser)
    return (
        <>
            <UserHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="profile" element={userAuthStatus ? <Profile /> : <UserLogin />} />
                <Route path="explore" element={userAuthStatus ? <Explore /> : <UserLogin />} />
                <Route path="login" element={<UserLogin />} />
                <Route path="about" element={<About />} />
                <Route path="register" element={<UserRegister />} />
                <Route path="career-roadmap/:careerId" element={userAuthStatus ? <CareerLearnRoadmap /> : <UserLogin />} />
                <Route path="/suggest-careers" element={userAuthStatus ? <SuggestCareers /> : <UserLogin />} />
            </Routes>
            <UserFooter/>
        </>
    )
}

export default UserRoutes
