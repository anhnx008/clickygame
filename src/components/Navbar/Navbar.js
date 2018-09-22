import React from "react";
import "./Navbar.css";

const Navbar = props => (
  <nav>
    <ul>
      <li id="current-score">Current Score: {props.currentScore} | Top Score: {props.topScore}</li>
      <li id="message">{props.message}</li>
    </ul>
  </nav>
);

export default Navbar;
