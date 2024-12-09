"use client";

import React from "react";
import "./navbar.css";
import logo from "@/assets/lectras_logo.png";
import Image from "next/image";
import Button from "../button/Button";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Link from "next/link";
import { redirect } from "next/navigation";

const navbar = () => {
  return (
    <div className="navbar">
      <Image
        onClick={() => {
          redirect("/");
        }}
        height={20}
        src={logo}
        alt="logo"
      />
      <div className="right">
        <div className="links">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
        </div>
        <div className="searchbar">
          <input type="text" placeholder="Search tutors..." />
          <SearchRoundedIcon />
        </div>
        <Button>Login</Button>
      </div>
    </div>
  );
};

export default navbar;
