import { createSlice } from "@reduxjs/toolkit";
import { addCareer, deleteCareer, fetchCareers, updateCareer } from "../adminCareer/adminCareerThunks";


const adminCareerSlice = createSlice({
  name: "careers",
  initialState: {
    careers: [],
    loading: false,
    error: "",
  },
  extraReducers: (builder) => {

    //fetch
    builder.addCase(fetchCareers.pending, state => {
      state.loading = true
      state.error = ""
    })

    builder.addCase(fetchCareers.fulfilled, (state, action) => {
      state.careers = action.payload
      state.loading = false
    })

    builder.addCase(fetchCareers.rejected, state => {
      state.careers = []
      state.loading = false
      state.error = "Failed to fetch careers"
    })

    //add
    builder.addCase(addCareer.pending, state => {
      state.loading = true
    })

    builder.addCase(addCareer.fulfilled, (state, action) => {
      state.loading = false
      state.careers.push(action.payload)
    })

    builder.addCase(addCareer.rejected, state => {
      state.loading = false
      state.error = "Failed to add Careers"
    })

    //update
    builder.addCase(updateCareer.pending, state => {
      state.loading = true
    })

    builder.addCase(updateCareer.fulfilled, (state, action) => {
      state.loading = false
      state.careers = state.careers.map(item => item._id == action.payload.id ? action.payload : item)
    })

    builder.addCase(updateCareer.rejected, state => {
      state.loading = false
      state.error = "Failed to update Careers"
    })

    //delete
    builder.addCase(deleteCareer.pending, state => {
      state.loading = true
    })

    builder.addCase(deleteCareer.fulfilled, (state, action) => {
      state.careers = state.careers.filter(item => item._id !== action.payload)
      state.loading = false;
    })

    builder.addCase(deleteCareer.rejected, state => {
      state.loading = false
      state.error = "Failed to delete Careers"
    })
  }
})

export default adminCareerSlice.reducer
