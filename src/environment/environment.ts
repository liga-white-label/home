const environments = {
  local: {
    baseUrl: "http://localhost:8081/",
    production: false,
  },
  ngrok: {
    baseUrl: "https://de92-190-109-48-252.ngrok-free.app/",
    production: false,
  },
  staging: {
    baseUrl: "https://staging-api.ligacubb.com.ar/",
    production: false,
  },
  prod: {
    baseUrl: "https://api.ligacubb.com.ar/",
    production: true,
  },
};

const urlToEnvMap = {
  localhost: environments.local,
  'staging-home.ligacubb.com.ar': environments.staging,
  'ligacubb.com.ar': environments.prod,
};

const { hostname } = window.location;

const defaultEnv = environments.local;

//export const environment = urlToEnvMap[hostname as keyof typeof urlToEnvMap] || defaultEnv;
export const environment = {
  production: false,
  baseUrl: "https://staging-api.ligacubb.com.ar/",
};