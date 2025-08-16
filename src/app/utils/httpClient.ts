import { environment } from "@/environment/environment";
import axios from "axios";

export const httpClient = axios.create({
  baseURL: environment.baseUrl,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "ngrok-skip-browser-warning": true,
  },
});
