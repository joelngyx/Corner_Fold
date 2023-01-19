import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./components/Login";
import Register from "./components/Register";
import TestPage from "./components/TestPage";
import Landing from "./components/Landing";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkIfAuthenticated = async() => {
      try {
        const response = await fetch("http://localhost:5500/verify", {
          method: "POST",
          headers: { token: localStorage.token }
        });

        const parseRes = await response.json();
        parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
      } catch (e) {
        console.log(e.message);
      }
  }

  useEffect(() => {
    checkIfAuthenticated();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" 
            element={isAuthenticated ? <TestPage/> : <Landing/>}/>
          <Route exact path="/login" 
            element={isAuthenticated ? <Navigate to="/testpage"/> : <Login setAuth={setIsAuthenticated}/>}/>
          <Route exact path="/register" 
            element={isAuthenticated ? <Navigate to="/testpage"/> : <Register setAuth={setIsAuthenticated}/>}/>
          <Route exact path="/testpage" 
            element={isAuthenticated ? <TestPage setAuth={setIsAuthenticated}/> : <Navigate to="/login"/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
