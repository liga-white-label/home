let baseUrl = "https://api.ligacubb.com.ar/";

if (process.env.NODE_ENV === "development") {
  baseUrl = "http://localhost:8081/";
}

export const environment = {
  production: process.env.NODE_ENV === "production",
  baseUrl,
};
