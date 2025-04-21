let baseUrl = "https://api.ligacubb.com.ar/";

if (false) {
  baseUrl = "http://localhost:8080";
}

export const environment = {
  production: process.env.NODE_ENV === "production",
  baseUrl,
};
