import React, { useState } from 'react';
import axios from 'axios';
import { URL } from '../api.http';
import { Link } from 'react-router-dom';
import './signinregister.scss';

interface userInfoType {
  username: string;
  password: string;
}

export const Signin = () => {
  const [userInfo, setUserInfo] = useState<userInfoType>({
    username: '',
    password: '',
  });

  const loginUser = async () => {
    const response = await axios.post(
      `${URL}${'auth'}/${'signin'}`,
      { username: userInfo.username, password: userInfo.password },
      { withCredentials: true }
    );
    setUserInfo({ username: '', password: '' });
    console.log(response);
  };

  return (
    <div id="background">
      <div id="largeContainer">
      <div id="loginContainer">
        <div id="title">Login</div>
        <h2 className="headers">Username</h2>
          <input
            id="userInput"
          type="text"
          value={userInfo.username}
          onChange={(e) =>
            setUserInfo({
              username: e.target.value,
              password: userInfo.password,
            })
          }
        ></input>
        <h2 className="headers">Password</h2>
          <input
            id="passInput"
          type="password"
          value={userInfo.password}
          onChange={(e) =>
            setUserInfo({
              username: userInfo.username,
              password: e.target.value,
            })
          }
        ></input>
        <button id="signInBtn" onClick={() => loginUser()}>Sign In</button>
      </div>
        <div id="colorContainer">
          <div id="registerTitle">Register</div>
          <div id="regText">Don't have an account? Register one!</div>
        <Link to="/register">
          <button id="registerLink">Register an Account</button>
        </Link>
        </div>
        </div>
    </div>
  );
};
