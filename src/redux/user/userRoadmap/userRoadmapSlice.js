import { createSlice } from "@reduxjs/toolkit";
import { fetchUserRoadmaps } from "./userRoadmapThunk";


const userRoadmapSlice  = createSlice({
  name: "roadmaps",
  initialState: {
    roadmaps: [],
    loading: false,
    error: "",
  },
  extraReducers: (builder) => {

    //fetch
    builder.addCase(fetchUserRoadmaps.pending, state => {
      state.loading = true
      state.error = ""
    })

    builder.addCase(fetchUserRoadmaps.fulfilled, (state, action) => {
      state.roadmaps = action.payload
      state.loading = false
    })

    builder.addCase(fetchUserRoadmaps.rejected, state => {
      state.roadmaps = []
      state.loading = false
      state.error = "Failed to fetch careers"
    })

  }
})

export default userRoadmapSlice .reducer
