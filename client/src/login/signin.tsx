import React, { useState } from 'react';
import axios from 'axios';
import { URL } from '../api.http';
import { Link } from 'react-router-dom';
import './signin.scss';

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
      <div id="signin">
      <h2 className= "headers">Username</h2>
      <input
        type="text"
        value={userInfo.username}
        onChange={(e) =>
          setUserInfo({ username: e.target.value, password: userInfo.password })
        }
      ></input>
      <h2 className= "headers">Password</h2>
      <input
        type="password"
        value={userInfo.password}
        onChange={(e) =>
          setUserInfo({ username: userInfo.username, password: e.target.value })
        }
      ></input>
      <button onClick={() => loginUser()}>Sign In</button>
      <Link to="/register"><button>No account? Register here!</button></Link>
    </div></div>
  );
};