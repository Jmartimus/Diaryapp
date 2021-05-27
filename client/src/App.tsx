import React from 'react';
import { Posts } from './profilepage/posts';
import './App.scss';
import { Registration } from './login/register';
import { Signin } from './login/signin';
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
          <Route path="/register">
            <Registration />
          </Route>
          <Route path="/posts">
            <Posts />
          </Route>
          <Route path="/">
            <Signin />
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
//myDiary.net
//purple/white scheme?
//welcome screen where you can click a button to signin/register and then from there pick your option.
