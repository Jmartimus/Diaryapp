import React from 'react';
import { Posts } from './profilepage/posts';
import './App.scss';
import { Signup } from './login/signup';

function App() {
  return (
    <div>
    <Signup/>
    <Posts />
    </div>
  );
}

export default App;
