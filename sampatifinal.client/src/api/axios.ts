import axios from "axios";

const api = axios.create({
  // baseURL: "https://walk-gondola-underarm.ngrok-free.dev/",
  baseURL: "https://localhost:7197",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;