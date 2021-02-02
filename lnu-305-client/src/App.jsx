import React from "react";
import Router from "./services/router";
import { ReactQueryConfigProvider } from "react-query";

import { AuthProvider } from "./services/AuthContext";
import "./assets/App.css";
import "semantic-ui-less/semantic.less";
import api from "./api";

window.myapi = api;

const queryConfig = {
  queries: {
    refetchOnWindowFocus: false,
    refetchInterval: false,
  },
};

const App = () => {
  return (
    <AuthProvider>
      <ReactQueryConfigProvider config={queryConfig}>
        <Router />
      </ReactQueryConfigProvider>
    </AuthProvider>
  );
};

export default App;
