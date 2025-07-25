import { createSlice } from "@reduxjs/toolkit";
import { fetchUserCareers } from "./userCareerThunks";

const userCareerSlice = createSlice({
  name: "careers",
  initialState: {
    careers: [],
    loading: false,
    error: "",
  },
  extraReducers: (builder) => {

    //fetch
    builder.addCase(fetchUserCareers.pending, state => {
      state.loading = true
      state.error = ""
    })

    builder.addCase(fetchUserCareers.fulfilled, (state, action) => {
      state.careers = action.payload
      state.loading = false
    })

    builder.addCase(fetchUserCareers.rejected, state => {
      state.careers = []
      state.loading = false
      state.error = "Failed to fetch careers"
    })

  }
})

export default userCareerSlice.reducer
