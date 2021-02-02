import React from "react";
import { Card } from "semantic-ui-react";
import cls from "../Dashboard/dashboard.module.scss";
import { Loading } from "app/components";
import ImageUploader from "./PictureUploader";
import uscs from "./uploadpicture.scss";

const UploadPicture = () => {
  return (
    <div className={cls["background"]}>
      {" "}
      <br /> <br /> <br />
      <section className={cls["nav-buttons-sections"]}>
        <Card.Group>
          <ImageUploader />
        </Card.Group>
      </section>{" "}
      <div style={{ marginBottom: "300px" }}></div>
      <br />
    </div>
  );
};
UploadPicture.propTypes = {};

export default UploadPicture;
