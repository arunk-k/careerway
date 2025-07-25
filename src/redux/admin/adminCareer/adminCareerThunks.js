import { createAsyncThunk } from "@reduxjs/toolkit";
import { addCareerApi, deleteCareerApi, getCareerApi, updateCareerApi } from "../../../services/adminService";

export const fetchCareers = createAsyncThunk('careers/fetch', async () => {
    const response = await getCareerApi()
    return response.data
})

export const addCareer = createAsyncThunk("careers/add", async (data) => {
    const response = await addCareerApi(data)
    return response.data;
})

export const updateCareer = createAsyncThunk('careers/update', async ({ id, updatedData }) => {
    const response = await updateCareerApi(id, updatedData)
    console.log(response)
    return response.data
})

export const deleteCareer = createAsyncThunk('careers/delete', async (id) => {
    await deleteCareerApi(id)
    return id
})


