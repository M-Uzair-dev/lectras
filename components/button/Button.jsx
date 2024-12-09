import React from "react";
import "./button.css";

const Button = (props) => {
  return (
    <div className="buttondiv">
      <button {...props}>{props.children}</button>
    </div>
  );
};

export default Button;
