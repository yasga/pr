import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./payment.css";

const PayementIcons = () => {
  return (
    <Fragment>
      <span className="d-inline">
        <Link to="/" className="iconn">
        <img  src="/paypal2.png"/>        </Link>
      </span>
      <span className="d-inline">
        <Link to="/" className="iconn">
        <img  src="/mastercard2.png"/>        </Link>
      </span>
      <span className="d-inline">
        <Link to="/" className="iconn">
        <img  src="/visa2.png"/>        </Link>
      </span>
      
    </Fragment>
  );
};

export default PayementIcons;