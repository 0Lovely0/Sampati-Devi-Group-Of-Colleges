import axios from "axios";

const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "https://localhost:7197"
    : "https://sampatigroup.stdruraltech.org";

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;