import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { URL } from '../api.http';
import { Link } from 'react-router-dom';
import './signinregister.scss';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import AccountCircle from '@material-ui/icons/AccountCircle';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

interface userInfoType {
  username: string;
  password: string;
}

export const Signin = () => {
  const [userInfo, setUserInfo] = useState<userInfoType>({
    username: '',
    password: '',
  });
  const history = useHistory();

  const loginUser = async () => {
    const response = await axios.post(
      `${URL}${'auth'}/${'signin'}`,
      { username: userInfo.username, password: userInfo.password },
      { withCredentials: true }
    );
    setUserInfo({ username: '', password: '' });
    sessionStorage.setItem('authToken', response.data.accessToken);
    if (response) {
      history.push('/posts');
    }
  };

  return (
    <div id="background">
      <div id="largeContainer">
        <div id="loginContainer">
          <div className="title">Login</div>
          <h2 className="loginHeaders">Username</h2>
          <FormControl>
            <TextField
              id="userInput"
              type="text"
              value={userInfo.username}
              variant="outlined"
              onChange={(e) =>
                setUserInfo({
                  username: e.target.value,
                  password: userInfo.password,
                })
              }
              InputProps={{
                startAdornment: <InputAdornment position="start">
                <AccountCircle fontSize="small"/>
              </InputAdornment>
              }}
              
            ></TextField>
            <h2 className="loginHeaders">Password</h2>
            <TextField
              id="passInput"
              type="password"
              value={userInfo.password}
              variant="outlined"
              onChange={(e) =>
                setUserInfo({
                  username: userInfo.username,
                  password: e.target.value,
                })
              }
              InputProps={{
                startAdornment: <InputAdornment position="start">
                <LockOpenIcon fontSize="small"/>
              </InputAdornment>
              }}
              
            ></TextField>
          </FormControl>
          <Button id="signInBtn" onClick={() => loginUser()}>
            Sign In
          </Button>
        </div>
        <div id="colorLogContainer">
          <div id="registerTitle">Register</div>
          <div id="regText">Don't have an account? Register one!</div>
          <Link className="link" to="/register">
            <Button className="loginRegLink">Register an Account</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
