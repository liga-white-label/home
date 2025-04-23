let baseUrl = "https://d84c-190-109-48-252.ngrok-free.app/";

if (false) {
  baseUrl = "http://localhost:8080";
}

export const environment = {
  production: process.env.NODE_ENV === "production",
  baseUrl,
};
