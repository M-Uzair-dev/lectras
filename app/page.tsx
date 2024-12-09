import React from "react";
import Card from "@/components/card/card";
const page = () => {
  return (
    <div className="mainpage">
      <h1 className="mainheading">Top Tutors :</h1>
      <div className="cards">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default page;
