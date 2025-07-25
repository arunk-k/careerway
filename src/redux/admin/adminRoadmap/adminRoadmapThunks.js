import { createAsyncThunk } from "@reduxjs/toolkit";
import { addRoadmapApi, deleteRoadmapApi, getRoadmapApi, updateRoadmapApi } from "../../../services/adminService";


export const fetchRoadmaps = createAsyncThunk('roadmaps/fetch', async (careerId = "") => {
  const response = await getRoadmapApi(careerId)
  return response.data;
})


export const addRoadmap = createAsyncThunk("roadsmap/add", async (data) => {
    const response = await addRoadmapApi(data)
    return response.data;
})

export const updateRoadmap = createAsyncThunk('roadsmap/update', async ({ id, updatedData }) => {
    const response = await updateRoadmapApi(id, updatedData)
    console.log(response)
    return response.data
})

export const deleteRoadmap = createAsyncThunk('roadsmap/delete', async (id) => {
    await deleteRoadmapApi(id)
    return id
})


