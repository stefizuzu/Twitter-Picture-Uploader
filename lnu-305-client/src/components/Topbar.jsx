import React from "react";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import FontAwesome from "react-fontawesome";
import cls from "./topbar.module.scss";

const Topbar = () => {
  return (
    <div
      className={classnames("ui", "menu", cls["topbar-container"])}
      style={{ backgroundColor: "#D2EAEC" }}
    >
      <NavLink className="item" to="/" exact>
        <h2 className={cls["company-name"]}>Home Page</h2>
      </NavLink>
      <NavLink className="item" to="/uploadimage">
        Upload
      </NavLink>
      <div className="right menu">
        <NavLink
          className="item"
          to="/signin"
          onClick={() =>
            window.dispatchEvent(
              new CustomEvent("auth", { detail: { type: "signout" } })
            )
          }
        >
          <FontAwesome className={cls["topbar-icon"]} name="sign-out" />
          Sign out
        </NavLink>
      </div>
    </div>
  );
};

export default Topbar;
