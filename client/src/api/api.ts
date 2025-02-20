import axios from "axios";

const API_LOCAL_URL = "http://localhost:3000/";

export const api = axios.create({
  baseURL: API_LOCAL_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
