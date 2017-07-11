import React from 'react';
import { Link } from 'react-router-dom';
import Splash from './Splash.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import OAuth from './OAuth.jsx';

const Home = () => {
  const user = window.user;
  
  if (!user) {
    return (
      <div>
        <div className="row justify-content-center">
          <Splash />
        </div>

        <div className="row justify-content-around" style={{ margin: '3em'}}>
          <Signup />
          <Login /> 
        </div>

        <div className="row justify-content-center">
          <OAuth /> 
        </div>
      </div>
    );
  } else {
    return (
        <div className="row justify-content-center">
          <Splash />
        </div>

    );
  }
};

export default Home;
