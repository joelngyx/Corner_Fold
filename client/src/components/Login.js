import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const goToLandingPage = () => {
    navigate("../");
  }

  const handleSubmit = async() => {
    try {
      const user_name = username;
      const user_pw = password;
      
      const body = {user_name, user_pw};
      const res = await fetch("http://localhost:5500/login", {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(body)
      });

      const jwtRes = await res.json();
      console.log(jwtRes);

      if (jwtRes.status === 403 || jwtRes.jwtToken === undefined) {
        setErrorMsg("Invalid credentials")
      } else {
        localStorage.setItem("token", jwtRes.jwtToken);
        props.setAuth(true);
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <div>
        <input placeholder="provide a username" value={username}
          onChange={(e) => {setUsername(e.target.value);}}/>
      </div>
      <div>
        <input placeholder="provide a password" value={password}
          onChange={(e) => {setPassword(e.target.value)}}/></div>
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={goToLandingPage}>Back</button>
      <div>{errorMsg}</div>
    </div>
  );
}

export default Login;