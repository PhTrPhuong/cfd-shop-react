import axiosInstance from "../utils/axiosInstance";

export const authService = {
    login(payload = {}) {
        return axiosInstance.post(`/customer/login`, payload);
    },
    register(payload = {}) {
        return axiosInstance.post(`/customer/register`, payload);
    },
    getProfile() {
        return axiosInstance.get(`/customer/profiles`);
    },
    updateProfile(payload = {}) {
        return axiosInstance.put(`/customer/profiles`, payload, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
};
