import React, { useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import { Dashboard, SignIn, PictureUploader } from "app/screens";
import { Topbar } from "app/components";
import AuthContext from "../AuthContext";
import cls from "./app.module.scss";

const Router = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  return (
    <BrowserRouter className="background">
      {isAuthenticated ? <Topbar user={user} /> : null}
      <div className={cls["app-body"]}>
        <Switch>
          <Route path="/signin" component={SignIn} />
          <PrivateRoute path="/uploadimage" component={PictureUploader} />
          <PrivateRoute exact path="/" component={Dashboard} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Router;
