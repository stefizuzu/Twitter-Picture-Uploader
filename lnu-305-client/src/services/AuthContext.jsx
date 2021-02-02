import React, {
  createContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import types from "prop-types";

import { API_URL } from "../api";
import { Loading } from "../components";
import { getCookie, setCookie, eraseCookie } from "./cookieManager";

const AuthContext = createContext({
  isAuthenticated: false,
  token: null,
  user: null,
});

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [{ isAuthenticated, token, user }, storeAuthSession] = useState({
    isAuthenticated: false,
    token: null,
    user: null,
  });

  useLayoutEffect(() => {
    wakeUp();

    async function wakeUp() {
      const response = await fetch(`${API_URL}/wake-up`);

      if (response.ok) {
        const userToken = getCookie("token");
        const userData = getCookie("user");

        if (userData) {
          const parsedToken = JSON.parse(userToken);
          const parsedUser = JSON.parse(userData);
          storeAuthSession({
            isAuthenticated: true,
            token: parsedToken,
            user: parsedUser,
          });
          setIsLoading(false);
        } else {
          storeAuthSession({ isAuthenticated: false, token: null, user: null });
          setIsLoading(false);
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("auth", handleAuthEvent, {
      passive: true,
    });

    return () => {
      window.removeEventListener("auth", handleAuthEvent, {
        passive: true,
      });
    };

    function handleAuthEvent(ev) {
      const { type: eventType, payload } = ev.detail;

      switch (eventType) {
        case "signin":
          setCookie("token", JSON.stringify(payload.token), 0.041);
          setCookie("user", JSON.stringify(payload.user), 0.041);

          storeAuthSession({
            isAuthenticated: true,
            token: payload.token,
            user: payload.user,
          });
          break;
        case "signout":
          eraseCookie("token");
          eraseCookie("user");
          storeAuthSession({ isAuthenticated: false, token: null, user: null });
          break;
        default:
          console.error(
            `* Invalid or unhandled auth event ${eventType} caught. Please check AuthContext.`
          );
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        token,
        user,
      }}
    >
      {isLoading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: types.node.isRequired,
};

export default AuthContext;
