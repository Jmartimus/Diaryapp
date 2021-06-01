import React, { useState } from 'react';
import axios from 'axios';
import { URL } from '../api.http';
import { Link } from 'react-router-dom';

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
      if (e.response.status === 400) {
        alert(e.response.data.message[0]);
      }
    }
  };

  //use the message above to put an error message on the page somewhere.

  return (
    <div id="background">
      <div id="regContainer">
        <p>Username</p>
        <form>
          <input
            type="text"
            value={userInfo.username}
            onChange={(e) =>
              setUserInfo({
                username: e.target.value,
                password: userInfo.password,
                firstname: userInfo.firstname,
                lastname: userInfo.lastname,
                email: userInfo.email,
              })
            }
          ></input>
          <p>Password</p>
          <input
            type="password"
            value={userInfo.password}
            onChange={(e) =>
              setUserInfo({
                username: userInfo.username,
                password: e.target.value,
                firstname: userInfo.firstname,
                lastname: userInfo.lastname,
                email: userInfo.email,
              })
            }
          ></input>
          <p>firstname</p>
          <input
            type="text"
            value={userInfo.firstname}
            onChange={(e) =>
              setUserInfo({
                username: userInfo.username,
                password: userInfo.password,
                firstname: e.target.value,
                lastname: userInfo.lastname,
                email: userInfo.email,
              })
            }
          ></input>
          <p>lastname</p>
          <input
            type="text"
            value={userInfo.lastname}
            onChange={(e) =>
              setUserInfo({
                username: userInfo.username,
                password: userInfo.password,
                firstname: userInfo.firstname,
                lastname: e.target.value,
                email: userInfo.email,
              })
            }
          ></input>
          <p>email</p>
          <input
            type="text"
            value={userInfo.email}
            onChange={(e) =>
              setUserInfo({
                username: userInfo.username,
                password: userInfo.password,
                firstname: userInfo.firstname,
                lastname: userInfo.lastname,
                email: e.target.value,
              })
            }
          ></input>
        </form>
        <button onClick={() => createUser()}>Register</button>
        <Link to="/">
          <button className="loginLink">Already have an account?</button>
        </Link>
      </div>
    </div>
  );
};
