import { createAsyncThunk } from "@reduxjs/toolkit"
import { getUserSuggestedCareersApi } from "../../../services/userService"


export const fetchUserSuggestedCareers = createAsyncThunk('suggested/fetch', async (interests) => {
    const response = await getUserSuggestedCareersApi(interests);
    return response.data;
})





