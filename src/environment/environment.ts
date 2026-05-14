const baseUrl =
  process.env.NEXT_PUBLIC_API_URL ??
  (process.env.NODE_ENV === "development"
    ? "http://localhost:8081/api/v1/"
    : "https://api.ligacubb.com.ar/api/v1/");

export const environment = {
  production: process.env.NODE_ENV === "production",
  baseUrl,
};
