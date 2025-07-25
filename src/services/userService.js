import { baseUrl } from "../components/common/baseUrl"
import apiClient from "./apiClient"

//login
export const LoginUser = async (data) => {
    return apiClient(`${baseUrl}auth/login`, "POST", "", data)
}

//Register
export const RegisterUser = async (data) => {
    return apiClient(`${baseUrl}auth/register`, "POST", "", data)
}

//careers
export const getUserCareersApi = async () => {
    const headers = {
        "Authorization": `Token ${sessionStorage.getItem('token')}`
    }
    return await apiClient(`${baseUrl}admin/careers`, "GET", headers, "")
}

//roadmaps
export const getUserRoadmapsApi = async (careerId) => {
    const headers = {
        "Authorization": `Token ${sessionStorage.getItem('token')}`
    }
    return await apiClient(`${baseUrl}admin/roadmap/career/${careerId}`, "GET", headers, "")
}

//suggest-Careers
export const getUserSuggestedCareersApi = async (data) => {
  const headers = {
    "Authorization": `Token ${sessionStorage.getItem('token')}`
  }
  return await apiClient(`${baseUrl}admin/careers/suggest`, "POST", headers, { interests: data });
};

//get user
export const getUserProfileApi = async () => {
  const headers = {
    "Authorization": `Token ${sessionStorage.getItem('token')}`,
  };
  return await apiClient(`${baseUrl}auth/user/profile`, "GET", headers, "");
};




