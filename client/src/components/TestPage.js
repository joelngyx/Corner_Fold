import React from "react";

const TestPage = (props) => {
  const logout = () => {
    localStorage.removeItem("token");
    props.setAuth(false);
  }

  return (<div>
    <h1>TestPage</h1>
    <button onClick={logout}>Logout</button>
  </div>);
}

export default TestPage;