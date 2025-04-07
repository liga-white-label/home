let baseUrl = "https://ligacubb.com.ar/";

if (process.env.NODE_ENV === "development") {
  baseUrl = "http://localhost:8080";
}

export const environment = {
  production: process.env.NODE_ENV === "production",
  baseUrl,
};
