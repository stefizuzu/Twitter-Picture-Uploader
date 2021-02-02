export const API_URL =
  process.env.NODE_ENV === "production"
    ? `https://${process.env.REACT_APP_API_URL}`
    : "http://localhost:8080";
