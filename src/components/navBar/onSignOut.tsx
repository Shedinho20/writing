import * as React from "react";
import { NavLink as Link } from "react-router-dom";

interface Props {}

const Onsignout = () => {
  return (
    <div>
      <Link to="/siginin" id="link">
        <button className="btn" id="btn-join">
          Join
        </button>
      </Link>
      <Link to="/login" id="link">
        <button className="btn" id="btn-login">
          Login
        </button>
      </Link>
    </div>
  );
};

export default Onsignout;
