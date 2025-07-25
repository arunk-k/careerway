import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserCareersApi } from "../../../services/userService";


export const fetchUserCareers = createAsyncThunk('careers/fetch', async () => {
    const response = await getUserCareersApi()
    return response.data
})



