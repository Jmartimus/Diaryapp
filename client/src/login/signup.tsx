import React, { useState } from 'react';
import axios from 'axios';
import { URL } from '../api.http';

interface userInfoSignupType {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
}

export const Signup = () => {
  const [userInfo, setUserInfo] = useState<userInfoSignupType>({
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
  });

  const createUser = async () => {
    const response = await axios.post(
      `${URL}${'auth'}/${'signup'}`,
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
    console.log(response);
  };

alert('figure out why regex isnt working on password input')
  return (
    <div>
      <h2>Username</h2>
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
      <h2>Password</h2>
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
      <h2>firstname</h2>
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
      <h2>lastname</h2>
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
      <h2>email</h2>
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
      <button onClick={() => createUser()}>Submit</button>
    </div>
  );
};
