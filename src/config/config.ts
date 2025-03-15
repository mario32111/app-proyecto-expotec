interface Config {
    env: string;
    api_url: string;
  }
  
  const config: Config = {
    env: import.meta.env.VITE_ENV || "development",
    api_url: import.meta.env.VITE_API_URL || "http://localhost:3000",
  };
  
  export { config };