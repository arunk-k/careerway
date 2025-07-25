import { createSlice } from "@reduxjs/toolkit";
import { deleteUser, fetchUsers, toggleUserStatus, UpdateUser } from "../adminUser/adminUserThunks";

const adminUserSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        loading: false,
        error: "",
    },
    extraReducers: (builder) => {

        //add
        builder.addCase(fetchUsers.pending, state => {
            state.loading = true
            state.error = ""
        })

        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.users = action.payload.users;
            state.loading = false
        })

        builder.addCase(fetchUsers.rejected, state => {
            state.users = []
            state.loading = false
            state.error = "Failed to fetch users"
        })

        // toggle user status
        builder.addCase(toggleUserStatus.fulfilled, (state, action) => {
            const { userId, isBlocked } = action.payload;
            const user = state.users.find(u => u._id === userId);
            if (user) {
                user.isBlocked = isBlocked;
            }
        })


        //update user
        builder.addCase(UpdateUser.pending, state => {
            state.loading = true
        })

        builder.addCase(UpdateUser.fulfilled, (state, action) => {
            state.loading = false
            state.users = state.users.map(item => item._id == action.payload.id ? action.payload : item)
        })

        builder.addCase(UpdateUser.rejected, state => {
            state.loading = false
            state.error = "Failed to update Users"
        })

        // delete user
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.users = state.users.filter(user => user._id !== action.payload);
        });

    }
})

export default adminUserSlice.reducer
