export const PROD_BACKEND_API_URL = "/api";
//export const DEV_BACKEND_API_URL = "http://127.0.0.1:8000";
export const DEV_BACKEND_API_URL = "http://ec2-13-50-233-252.eu-north-1.compute.amazonaws.com";
export const BACKEND_API_URL =
  process.env.NODE_ENV === "development" ? DEV_BACKEND_API_URL : PROD_BACKEND_API_URL;
