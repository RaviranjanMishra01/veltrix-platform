import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8000",
});

export const registerUser = async (data) => {
    const res = await API.post(
        "/api/auth/register",
        data
    );

    return res.data;
};

export const loginUser = async (data) => {
    const res = await API.post(
        "/api/auth/login",
        data
    );

    return res.data;
};

export const forgotPassword = async (email) => {
    const res = await API.post(
        "/api/auth/forgot-password",
        { email }
    );

    return res.data;
}