import React from "react";
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
    <div>
      <h1>CornerFold</h1>
      <button onClick={goToRegister}>register</button>
      <button onClick={goToLogin}>login</button>
    </div>
  )
}

export default Landing;