import React, { useState } from 'react';
import axios from 'axios';
import { URL } from '../api.http';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import AccountCircle from '@material-ui/icons/AccountCircle';
import TextField from '@material-ui/core/TextField';
import './signinregister.scss';

interface userInfoRegistrationType {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
}

export const Registration = () => {
  const [userInfo, setUserInfo] = useState<userInfoRegistrationType>({
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
  });

  const createUser = async () => {
    try {
      await axios.post(
        `${URL}${'auth'}/${'register'}`,
        {
          username: userInfo.username,
          password: userInfo.password,
          firstname: userInfo.firstname,
          lastname: userInfo.lastname,
          email: userInfo.email,
        },
        { withCredentials: true }
      );
      setUserInfo({
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        email: '',
      });
    } catch (e) {
      if (e.response.status > 399) {
        alert(e.response.data.message[0]);
      }
    }
  };

  //use the message above to put an error message on the page somewhere.
//date must be a string?

  return (
    <div id="background">
      <div id="largeContainer">
        <div id="colorRegContainer">
        <div id="loginTitle">Login</div>
          <div id="loginText">Already have an account? Log in!</div>
          <Link className="link" to="/">
            <Button className="loginRegLink">Login to your account</Button>
          </Link>
        </div>
        <div id="regContainer">
          <div className="title">Registration</div>
          <h2 className="regHeaders">Username</h2>
          <FormControl>
            <TextField
              id="userRegInput"
              defaultValue="small" size="small"
              type="text"
              value={userInfo.username}
              variant="outlined"
              onChange={(e) =>
                setUserInfo({
                  username: e.target.value,
                  password: userInfo.password,
                  firstname: userInfo.firstname,
                  lastname: userInfo.lastname,
                  email: userInfo.email,
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle fontSize="small" />
                  </InputAdornment>
                ),
              }}
            ></TextField>
            <h2 className="regHeaders">Password</h2>
            <TextField
              id="passRegInput"
              defaultValue="small" size="small"
              type="password"
              value={userInfo.password}
              variant="outlined"
              onChange={(e) =>
                setUserInfo({
                  username: userInfo.username,
                  password: e.target.value,
                  firstname: userInfo.firstname,
                  lastname: userInfo.lastname,
                  email: userInfo.email,
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}></TextField>
            <h2 className="regHeaders">First Name</h2>
            <TextField
              id="firstNameInput"
              defaultValue="small" size="small"
              type="text"
              value={userInfo.firstname}
              variant="outlined"
              onChange={(e) =>
                setUserInfo({
                  username: userInfo.username,
                  password: userInfo.password,
                  firstname: e.target.value,
                  lastname: userInfo.lastname,
                  email: userInfo.email,
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}></TextField>
            <h2 className="regHeaders">Last Name</h2>
            <TextField
              id="lastNameInput"
              defaultValue="small" size="small"
              type="text"
              value={userInfo.lastname}
              variant="outlined"
              onChange={(e) =>
                setUserInfo({
                  username: userInfo.username,
                  password: userInfo.password,
                  firstname: userInfo.firstname,
                  lastname: e.target.value,
                  email: userInfo.email,
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}></TextField>
            <h2 className="regHeaders">Email</h2>
            <TextField
              id="emailInput" defaultValue="small" size="small"
              type="text"
              value={userInfo.email}
              variant="outlined"
              onChange={(e) =>
                setUserInfo({
                  username: userInfo.username,
                  password: userInfo.password,
                  firstname: userInfo.firstname,
                  lastname: userInfo.lastname,
                  email: e.target.value,
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}></TextField>
          </FormControl>
          <Button id="regBtn" onClick={() => createUser()}>Sign up!</Button>
        </div>
      </div>
    </div>
  );
};
