import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
});

// Automatically inject Clerk JWT token in all API requests on the client-side
api.interceptors.request.use(async (config) => {
  if (typeof window !== "undefined" && (window as any).Clerk?.session) {
    try {
      const token = await (window as any).Clerk.session.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Failed to inject Clerk token:", error);
    }
  }
  return config;
});

export default api;
