import axios from "axios";

export const BACKEND_URL = "http://localhost:5000/api";

export const http = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
