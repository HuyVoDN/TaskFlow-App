import React from "react";
import "./Landing.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="landing-container">
        <div className="landing-top">
          <div className="landing-header">Task Flow</div>
          <div className="landing-text">
            Manage and Plan your projects with ease
          </div>
        </div>

        <div className="landing-links">
          <Link className="landing-button" to="/login">
            Login
          </Link>
          <Link className="landing-button" to="/registration">
            Register
          </Link>
        </div>
      </div>
    </>
  );
};

export default Landing;
