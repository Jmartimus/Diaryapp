import React from 'react';
import { Posts } from './profilepage/posts';
import './App.scss';
import { Signup } from './login/signup';
import { Login } from './login/login';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/posts">
            <Posts />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;


//BACKLOG:
//figure out why regex won't work on password
//how to get to the profilepage from login screen
//potentially use redux to get the api calls out of these components
//issues in search bar to address
