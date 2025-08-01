import { environment } from "@/environment/environment";
import axios from "axios";

export const httpClient = axios.create({
  baseURL: environment.baseUrl,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "ngrok-skip-browser-warning": true,
  },
});

httpClient.interceptors.request.use(
  (config) => {
    const username = "adminLIGA.25";
    const password = "25.adminLIGA";
    // const username = "admin";
    // const password = "password";
    const token = btoa(`${username}:${password}`);

    if (config.headers) {
      config.headers["Authorization"] = `Basic ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
