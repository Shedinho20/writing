import React from "react";
import Loader from "react-loader-spinner";

const Loaderspinner = () => {
  return (
    <div className="lazyLoader">
      <Loader type="Oval" color="#57b894" height={50} width={50} timeout={30000} />
    </div>
  );
};

export default Loaderspinner;
