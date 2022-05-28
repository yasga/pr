import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./social.css";

const SocialIcons = () => {
  return (
    <Fragment>
      <span className="d-inline">
        <Link to="/" className="icon">
          <FontAwesomeIcon icon={["fab", "facebook-f"]} size="lg" />
        </Link>
      </span>
      <span className="d-inline">
        <Link to="/" className="icon">
          <FontAwesomeIcon icon={["fab", "github"]} size="lg" />
        </Link>
      </span>
      <span className="d-inline">
        <Link to="/" className="icon">
          <FontAwesomeIcon icon={["fab", "instagram"]} size="lg" />
        </Link>
      </span>
      <span className="d-inline">
        <Link to="/" className="icon">
          <FontAwesomeIcon icon={["fab", "youtube"]} size="lg" />
        </Link>
      </span>
      <span className="d-inline">
        <Link to="/" className="icon">
          <FontAwesomeIcon icon={["fab", "twitter"]} size="lg" />
        </Link>
      </span>
      <span className="d-inline">
        <Link to="/" className="icon">
          <FontAwesomeIcon icon={["fab", "tiktok"]} size="lg" />
        </Link>
      </span>
    </Fragment>
  );
};

export default SocialIcons;