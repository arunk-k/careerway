import { configureStore } from "@reduxjs/toolkit";
import adminCareerSlice from './admin/adminCareer/adminCareerslice'
import userCareerSlice from './user/userCareer/userCareerslice'
import userRoadmapSlice from './user/userRoadmap/userRoadmapSlice'
import userSuggestCareerSlice from './user/userSuggestCareer/userSuggestCareerSlice'
import adminRoadmapSlice from './admin/adminRoadmap/adminRoadmapSlice'
import adminUserSlice from './admin/adminUser/adminUserSlice'
const store = configureStore({
    reducer:{
        adminCareerSlice,
        userCareerSlice,
        adminRoadmapSlice,
        userRoadmapSlice,
        userSuggestCareerSlice,
        adminUserSlice
    }
})

export default store