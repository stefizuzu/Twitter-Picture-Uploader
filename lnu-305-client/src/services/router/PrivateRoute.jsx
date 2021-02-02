import React, { useContext } from "react";
import types from "prop-types";
import { Redirect } from "react-router-dom";

import AuthContext from "../AuthContext";

const PrivateRoute = ({ accessTo, component: Component, path, ...props }) => {
  const { isAuthenticated, user } = useContext(AuthContext);

  if (!isAuthenticated) {
    return (
      <Redirect to={{ pathname: "/signIn", search: `?redirectTo=${path}` }} />
    );
  }
  return <Component user={user} {...props} />;
};

PrivateRoute.propTypes = {
  component: types.func.isRequired,
  path: types.string.isRequired,
};

export default PrivateRoute;
