import { environment } from "@/environment/environment";
import axios from "axios";

export const httpClient = axios.create({
  baseURL: environment.baseUrl,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "ngrok-skip-browser-warning": true,
  },
});

httpClient.interceptors.response.use((response) => {
  if (
    response.data &&
    typeof response.data === "object" &&
    "success" in response.data &&
    "data" in response.data
  ) {
    response.data = response.data.data;
  }
  return response;
});
