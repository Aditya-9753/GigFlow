
import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // JWT HttpOnly cookie ke liye
  headers: {
    "Content-Type": "application/json",
  },
});

// OPTIONAL: global error handling (safe to keep)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;