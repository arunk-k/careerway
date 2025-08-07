import { baseUrl } from "../components/common/baseUrl"
import apiClient from "./apiClient"

//admin
export const LoginAdmin = async (data) => {
    return apiClient(`${baseUrl}auth/admin/login`, "POST", "", data)
}

//users
export const getUserApi = async () => {
    const headers = {
        "Authorization": `Token ${sessionStorage.getItem('admintoken')}`
    }
    return apiClient(`${baseUrl}auth/admin/users`, "GET", headers, "")
}

// Toggle User Status
export const toggleUserStatusApi = async (userId) => {
    const headers = {
        "Authorization": `Token ${sessionStorage.getItem('admintoken')}`
    }
    return await apiClient(`${baseUrl}auth/admin/user/toggle-status/${userId}`, "PUT", headers)
}

// Delete User
export const deleteUserApi = async (userId) => {
    const headers = {
        "Authorization": `Token ${sessionStorage.getItem('admintoken')}`
    }
    return await apiClient(`${baseUrl}auth/admin/users/${userId}`, "DELETE", headers)
}

//profile update
export const updateUserApi = async (data) => {
    const headers = {
        "Authorization": `Token ${sessionStorage.getItem('token')}`,
        "Content-Type": "multipart/form-data"
    }
    return await apiClient(`${baseUrl}auth/updateProfile`, "PUT", headers, data);
}

//careers
export const addCareerApi = async (data) => {
    const headers = {
        "Authorization": `Token ${sessionStorage.getItem('admintoken')}`
    }
    return await apiClient(`${baseUrl}admin/careers`, "POST", headers, data)
}

export const getCareerApi = async () => {
    const headers = {
        "Authorization": `Token ${sessionStorage.getItem('admintoken')}`
    }
    return await apiClient(`${baseUrl}admin/careers`, "GET", headers, "")
}

export const updateCareerApi = async (id, data) => {
    const headers = {
        "Authorization": `Token ${sessionStorage.getItem('admintoken')}`
    }
    return await apiClient(`${baseUrl}admin/careers/${id}`, "PUT", headers, data)
}

export const deleteCareerApi = async (id) => {
    const headers = {
        "Authorization": `Token ${sessionStorage.getItem('admintoken')}`
    }
    return await apiClient(`${baseUrl}admin/careers/${id}`, "DELETE", headers)
}

// ---------- ROADMAP APIs (Admin) ----------
export const addRoadmapApi = async (data) => {
    const headers = {
        "Authorization": `Token ${sessionStorage.getItem('admintoken')}`
    };
    return await apiClient(`${baseUrl}admin/roadmap`, "POST", headers, data);
};


export const updateRoadmapApi = async (id, data) => {
    const headers = {
        "Authorization": `Token ${sessionStorage.getItem('admintoken')}`
    };
    return await apiClient(`${baseUrl}admin/roadmap/${id}`, "PUT", headers, data);
};

export const deleteRoadmapApi = async (id) => {
    const headers = {
        "Authorization": `Token ${sessionStorage.getItem('admintoken')}`
    };
    return await apiClient(`${baseUrl}admin/roadmap/${id}`, "DELETE", headers);
};

export const getRoadmapApi = async (careerId = "") => {
    const headers = {
        "Authorization": `Token ${sessionStorage.getItem('admintoken')}`
    };

    const url = careerId
        ? `${baseUrl}admin/roadmap/career/${careerId}`
        : `${baseUrl}admin/roadmap`;

    return await apiClient(url, "GET", headers, "");
};




