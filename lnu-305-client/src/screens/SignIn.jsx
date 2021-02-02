import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import io from "socket.io-client";
import OAuth from "../services/OAuth";

import { API_URL } from "../api";
import AuthContext from "../services/AuthContext";

const socket = io(API_URL, {
  withCredentials: true,
});
const providers = ["twitter"];

const SignIn = () => {
  const { isAuthenticated } = useContext(AuthContext);
  if (isAuthenticated) return <Redirect to={{ pathname: "/" }} />;

  return (
    <div className="wrapper" style={{ backgroundColor: "#0f2147" }}>
      <div className="container">
        {providers.map((provider) => (
          <OAuth provider={provider} key={provider} socket={socket} />
        ))}
      </div>
    </div>
  );
};

export default SignIn;
