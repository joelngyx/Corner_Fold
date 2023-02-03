import React, { useState, useEffect } from "react";
import TopBar from "./dashboard/TopBar";
import Collection from './dashboard/Collection';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../store/userInfoSlice';

const Dashboard = (props) => {
  const collections = useSelector((state) => state.collections.value)
  const count = useSelector((state) => state.userInfo.value);
  const dispatch = useDispatch(); 
  
  const logout = () => {
    localStorage.removeItem("token");
    props.setAuth(false);
  }

  return (
    <div>
      <TopBar logout={logout}/>
      <div className="collection-content">
        <Collection type='default' name='james'/>
        {collections.map(
          (item, index) => 
          <Collection key={index} type='user-collection' name={item.name} description={item.description}/>
        )}
      </div>
      <h1>{count}</h1>
      <button onClick={() => {dispatch(increment())}}>redux test ++</button>
      <button onClick={() => {dispatch(decrement())}}>redux test --</button>
      <button onClick={() => {
        for (let i = 0; i < collections.length; i ++) {
          console.log(collections[i]);
        }
      }}>Test</button>
    </div>);
}

export default Dashboard;