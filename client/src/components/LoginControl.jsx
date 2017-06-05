import React from 'react';
import userName from './UserNameDisplay';
import CountdownTimer from './CountdownTimer';

const LoginControl = () => {
  const user = window.user;

  if (user){
    return (
        <ul className="nav navbar-nav navbar-right">
          <CountdownTimer />
          <li>
            <a href="/logout">Logout</a>
          </li>
        </ul>
      );
    }
    else {
      return (
        <ul className="nav navbar-nav navbar-right">
          <li>
            <a href="/login">
              Login<span className="sr-only"></span>
            </a>
          </li>

          <li>
            <a href="/signup">
              Signup<span className="sr-only">(current)</span>
            </a>
          </li>
        </ul>
      );
  }
};

export default LoginControl;
