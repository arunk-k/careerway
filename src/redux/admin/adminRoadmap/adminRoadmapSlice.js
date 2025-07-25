import { createSlice } from "@reduxjs/toolkit";
import { addRoadmap, deleteRoadmap, fetchRoadmaps, updateRoadmap } from "./adminRoadmapThunks";

const adminRoadmapSlice = createSlice({
  name: "roadmaps",
  initialState: {
    roadmaps: [],
    loading: false,
    error: "",
  },
  extraReducers: (builder) => {

    //fetch
    builder.addCase(fetchRoadmaps.pending, state => {
      state.loading = true
      state.error = ""
    })

    builder.addCase(fetchRoadmaps.fulfilled, (state, action) => {
      state.roadmaps = action.payload
      state.loading = false
    })

    builder.addCase(fetchRoadmaps.rejected, state => {
      state.roadmaps = []
      state.loading = false
      state.error = "Failed to fetch Roadmaps"
    })

    //add
    builder.addCase(addRoadmap.pending, state => {
      state.loading = true
    })

    builder.addCase(addRoadmap.fulfilled, (state, action) => {
      state.loading = false
      state.roadmaps.push(action.payload)
    })

    builder.addCase(addRoadmap.rejected, state => {
      state.loading = false
      state.error = "Failed to add Roadmaps"
    })

    //update
    builder.addCase(updateRoadmap.pending, state => {
      state.loading = true
    })

    builder.addCase(updateRoadmap.fulfilled, (state, action) => {
      state.loading = false
      state.roadmaps = state.roadmaps.map(item => item._id == action.payload.id ? action.payload : item)
    })

    builder.addCase(updateRoadmap.rejected, state => {
      state.loading = false
      state.error = "Failed to update Roadmaps"
    })

    //delete
    builder.addCase(deleteRoadmap.pending, state => {
      state.loading = true
    })

    builder.addCase(deleteRoadmap.fulfilled, (state, action) => {
      state.roadmaps = state.roadmaps.filter(item => item._id !== action.payload)
      state.loading = false;
    })

    builder.addCase(deleteRoadmap.rejected, state => {
      state.loading = false
      state.error = "Failed to delete Roadmaps"
    })
  }
})

export default adminRoadmapSlice.reducer
