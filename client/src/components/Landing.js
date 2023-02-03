import React from "react";
import Logo from '../assets/Logo.svg';
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const goToRegister = () => {
    navigate("/register")
  }

  const goToLogin = () => {
    navigate("/login")
  }

  return (
    <div className="landing center">
      <img className="logo" src={Logo} alt="CornerFold Logo"/>
      <div className="center">
        <h1>CornerFold</h1>
        <div className="landing-btns">
          <button onClick={goToRegister}>Register</button>
          <button onClick={goToLogin}>Login</button>
        </div>
      </div>
    </div>
  )
}

export default Landing;