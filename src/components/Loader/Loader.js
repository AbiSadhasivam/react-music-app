import React from "react";
import './Loader.css';
import { Spinner } from "reactstrap";

function Loader() {
  return (
    <div className="overlay d-flex justify-content-center align-items-center">
      <Spinner className="spinner"/>{" "}
    </div>
  );
}

export default Loader;
