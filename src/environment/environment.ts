const environments = {
  local: {
    backEnd: 'http://localhost:8081/',
    production: false,
  },
  ngrok: {
    backEnd: 'https://de92-190-109-48-252.ngrok-free.app/',
    production: false,
  },
  staging: {
    backEnd: 'https://staging-api.ligacubb.com.ar/',
    production: false,
  },
  prod: {
    backEnd: 'https://api.ligacubb.com.ar/',
    production: true,
  },
};

const urlToEnvMap = {
  localhost: environments.local,
  'ligacubb.com.ar': environments.prod,
  'staging-home.ligacubb.com.ar': environments.staging,
};

const { hostname } = window.location;

const defaultEnv = environments.local;

export const environment = urlToEnvMap[hostname as keyof typeof urlToEnvMap] || defaultEnv;
