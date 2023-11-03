// src/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001", // Backend server URL
  withCredentials: true, // Include credentials (like cookies) with requests
});

export default api;
