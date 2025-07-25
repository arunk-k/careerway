import { createSlice } from "@reduxjs/toolkit";
import { fetchUserSuggestedCareers } from "./userSuggestCareerThunks";

const userSuggestCareerSlice = createSlice({
  name: "suggestedCareers",
  initialState: {
    suggestedCareers: [],
    loading: false,
    error: "",
  },
  extraReducers: (builder) => {

    //fetch
    builder.addCase(fetchUserSuggestedCareers.pending, state => {
      state.loading = true
      state.error = ""
    })

    builder.addCase(fetchUserSuggestedCareers.fulfilled, (state, action) => {
      state.suggestedCareers = action.payload
      state.loading = false
    })

    builder.addCase(fetchUserSuggestedCareers.rejected, state => {
      state.suggestedCareers = []
      state.loading = false
      state.error = "Failed to fetch suggested careers"
    })

  }
})

export default userSuggestCareerSlice.reducer
