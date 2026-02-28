import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});
api.interceptors.request.use((config) => {
  if (typeof document !== 'undefined') {
    const token = document.cookie
      .split('; ')
      .find((r) => r.startsWith('token='))
      ?.split('=')[1];

    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});