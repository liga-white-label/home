let baseUrl = "https://api.ligacubb.com.ar/";

if (process.env.NODE_ENV === "development") {
  baseUrl = "https://c2af-190-109-48-252.ngrok-free.app/";
}

export const environment = {
  production: process.env.NODE_ENV === "production",
  baseUrl,
};
