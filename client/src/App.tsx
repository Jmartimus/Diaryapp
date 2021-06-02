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
//potentially use redux to get the api calls out of these components (use global state to send name info to the profile page so that I can welcome the user)
//issues in search bar to address
//myDiary.net
//make materialUI outline change colors
//Username: Username1
//Password: Password1!
//can still find accesstoken in dev tools in network("is this dangerous?")
//cannot post anything on posts page

