import React from "react";
import { Route, Switch } from "react-router-dom";
import { UploadPicture } from "app/screens";

const UploadPictureRouter = () => {
  return (
    <Switch>
      <Route path="/uploadimage" component={UploadPicture} />
    </Switch>
  );
};

export default UploadPictureRouter;
