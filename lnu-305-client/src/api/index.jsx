import { create } from "apisauce";
import { getCookie } from "../services/cookieManager";
import { API_URL } from "./apiUrl";

const api = create({
  baseURL: API_URL,
  headers: { Accept: "application/json" }, // other default headers here
});

api.addRequestTransform((request) => {
  const token = getCookie("token");

  if (token) {
    const authToken = JSON.parse(token);
    request.headers["Authorization"] = `Bearer ${authToken}`;
  }
});

const apiMonitor = (response) => {
  if (response.status === 401) {
    // 401 Unauthorized
    const signoutEvent = new CustomEvent("auth", {
      detail: { type: "signout" },
    });
    window.dispatchEvent(signoutEvent);
  }
};
api.addMonitor(apiMonitor);

export {API_URL};
export default api;
