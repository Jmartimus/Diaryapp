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
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

function App() {
  const theme = createMuiTheme({
    palette: {
      primary: {main: "#D83F87"}
    },
  });
  return (
    <ThemeProvider theme={theme} >
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
      </ThemeProvider>
  );
}

export default App;


//BACKLOG:
//how to get back to sign in from the profilepage.
//potentially use redux to get the api calls out of these components
//issues in search bar to address
//myDiary.net
//purple/white scheme?
//welcome screen where you can click a button to signin/register and then from there pick your option.
//auth token is exposed on front end when object comes back
//decorators aren't doing anything to limit size of username and password.
//figure out why regex won't work on password
//make materialUI outline change colors

