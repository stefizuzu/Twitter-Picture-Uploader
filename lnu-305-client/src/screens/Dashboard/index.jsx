import React from "react";
import { Divider, Image } from "semantic-ui-react";
import cls from "./dashboard.module.scss";

const Dashboard = ({ user }) => {
  return (
    <section className={(cls["dashboard-section"], cls["background"])}>
      <section className={cls["user-meta-section"]}>
        <br />
        <br />
        <br />
        <Image className={cls["avatar"]} alt="user avatar" src={user.photo} />
        <div className={cls["user-greeting"]}>
          Logged in as <b>{user.username}</b>
        </div>
        <div>Web and Mobile Development</div>
        <div className={cls["h1"]}>Direct Twitter Picture Uploader</div>
        <br />
        <br />
        <br />
      </section>
      <Divider />
      <li className={cls["user-meta-section"]}>
        <a
          href={"https://twitter.com/" + user.username.replace(/\s+/g, "")}
          target="_blank"
        >
          <img className={cls["banner"]} src="twitter-banner.jpg" alt="" />
          <div>Click to go to youre Twitter profile </div>
        </a>
      </li>
      <div className={cls["space"]}></div>
      <footer className={cls["footer"]}>
        <div
          className="text-center p-3"
          style={{ backgroundcolor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2021 Web and Mobile Development:
          <a className="text-dark"> &nbsp;&nbsp;&nbsp;&nbsp; by STEPHANIE</a>
        </div>
        <br />
      </footer>
    </section>
  );
};

export default Dashboard;
