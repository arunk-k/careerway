import { createAsyncThunk } from "@reduxjs/toolkit"
import { getUserRoadmapsApi } from "../../../services/userService"

export const fetchUserRoadmaps  = createAsyncThunk('roadmaps/fetch', async (careerId) => {
    const response = await getUserRoadmapsApi(careerId)
    return response.data
}) 





