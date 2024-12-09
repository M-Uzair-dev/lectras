import React from "react";
import "./card.css";
import Image from "next/image";
import Button from "../button/Button";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
const page = () => {
  return (
    <div className="card">
      <div className="proflediv">
        <div className="userinfo">
          <Image
            className="profileImage"
            height={35}
            width={35}
            alt="user image"
            src="data:image/png;base64,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"
          />
          <div className="user">
            <p className="username">Users name</p>
            <p className="followers">1053 students</p>
          </div>
        </div>
        <div className="button">
          <Button>Profile</Button>
        </div>
      </div>
      <p className="bio">
        cupiditate itaque ipsa est maiores, autem saepe quisquam a atque labore
        repellat dolore harum ex omnis porro eligendi tempore pariatur.
        cupiditate itaque ipsa est maiores, autem saepe quisquam a atque labore
        repellat dolore harum ex omnis porro eligendi tempore pariatur.
        cupiditate itaque ipsa est maiores, autem saepe quisquam a atque labore
        repellat dolore harum ex omnis porro eligendi tempore pariatur.
        cupiditate itaque ipsa est maiores, autem saepe quisquam a atque labore
        repellat dolore harum ex omnis porro eligendi tempore pariatur.
      </p>
      <div className="bottomdiv">
        <div className="leftContent">
          <AttachMoneyIcon />{" "}
          <p>
            <span>10k</span> PKR/Month
          </p>
        </div>
        <div className="rightContent">
          <PlayCircleIcon />
          <p>32 Lectures</p>
        </div>
      </div>
    </div>
  );
};

export default page;
