import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteUserApi, getUserApi, toggleUserStatusApi, updateUserApi } from "../../../services/adminService";


export const fetchUsers = createAsyncThunk("users/fetch", async () => {
    const response = await getUserApi()
    return response.data
})

export const toggleUserStatus = createAsyncThunk("admin/toggleUserStatus", async (userId, { rejectWithValue }) => {
    try {
        const response = await toggleUserStatusApi(userId)
        return {
            success: response.data.success,
            userId,
            isBlocked: response.data.user.isBlocked,
        }
    } catch (err) {
        return rejectWithValue("Failed to toggle user status")
    }
})


export const deleteUser = createAsyncThunk('users/delete', async (id) => {
    await deleteUserApi(id)
    return id
})

export const UpdateUser = createAsyncThunk('users/update', async (formData) => {
    const response = await updateUserApi(formData)
    return response.data;
})




