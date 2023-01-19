import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsgUsername, setErrorMsgUsername] = useState();
  const [errorMsgPassword, setErrorMsgPassword] = useState();
  const [errorMsg, setErrorMsg] = useState("");
  const [detailsValid, setDetailsValid] = useState(false);

  const navigate = useNavigate();

  const setErrorMsgListUsername = (conditions) => {
    setErrorMsgUsername(<ul>{conditions.map((condition, index) => <p key={index}>{condition}</p>)}</ul>);
  }

  const setErrorMsgListPassword = (conditions) => {
    setErrorMsgPassword(<ul>{conditions.map((condition, index) => <p key={index}>{condition}</p>)}</ul>);
  }

  const validateUsername = () => {
    let conditions = [];
    
    if (username.length < 5) 
      conditions.push("Username must be at least 5 characters long");

    return conditions;
  }

  const validatePassword = () => {
    let conditions = [];

    if (password.length < 8)
      conditions.push("Password must be at least 8 characters long");

    return conditions;
  }

  const goToLandingPage = () => {
    navigate("../");
  }

  
  useEffect(() => {
    const conditions1 = validateUsername();
    setErrorMsgListUsername(conditions1);

    const conditions2 = validatePassword();
    setErrorMsgListPassword(conditions2);

    if (conditions1.length === 0 && conditions2.length === 0)
      setDetailsValid(true);
    else 
    setDetailsValid(false);
  }, [username, password]);

  const handleSubmit = async() => {
    try {
      const user_name = username;
      const user_pw = password;
      
      const body = {user_name, user_pw};
      console.log(body);
      const res = await fetch("http://localhost:5500/register", {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(body)
      });

      const jwtRes = await res.json();
      
      if (jwtRes.jwtToken === undefined) {
        setErrorMsg("Username is taken!")
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
      <h1>Register</h1>
      <div>
        <input placeholder="provide a username" value={username}
          onChange={(e) => {setUsername(e.target.value);}}/>
      </div>
      <div>{errorMsgUsername}</div>
      <div>
        <input placeholder="provide a password" value={password}
          onChange={(e) => {setPassword(e.target.value)}}/></div>
      <div>{errorMsgPassword}</div>
      <button disabled={!detailsValid} 
        onClick={handleSubmit}>Submit</button>
      <button onClick={goToLandingPage}>Back</button>
      <div>{errorMsg}</div>
    </div>
  );
}

export default Register;