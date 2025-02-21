const environments = {
  local: {
    backEnd:
      "https://6f08-2001-fb1-d9-90f5-c462-82a4-87b6-62ab.ngrok-free.app/",
    production: false,
  },
  prod: {
    backEnd: "https://league-cubb.fly.dev/",
    production: true,
  },
};

const urlToEnvMap = {
  localhost: environments.local,
  "liga-cubb-home.vercel.app": environments.prod,
};

const { hostname } = window.location;

const defaultEnv = environments.local;

export const environment =
  urlToEnvMap[hostname as keyof typeof urlToEnvMap] || defaultEnv;
