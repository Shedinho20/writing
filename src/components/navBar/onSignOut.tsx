import * as React from "react";
import { NavLink as Link } from "react-router-dom";
import Mybutton from "../MUI/button";

const Onsignout = () => {
  return (
    <div>
      <Link to="/siginin" id="link">
        <Mybutton name="Join" type="button" color="primary" />
      </Link>
      <Link to="/login" id="link">
        <Mybutton name="Login" type="button" />
      </Link>
    </div>
  );
};

export default Onsignout;
