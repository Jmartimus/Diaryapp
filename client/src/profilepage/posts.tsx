import React, { useState } from 'react';
import axios from 'axios';

export const Posts = () => {
  const [newPost, setNewPost] = useState({
    title: '',
    body: '',
  });

 const post = async () => {
   await axios.post(
     'http://localhost:8080/posts',
     { title: newPost.title, body: newPost.body },
     {withCredentials: true},
  )
  }

  return (
    <div>
      <input
        value={newPost.title}
        placeholder="type your title here..."
        type="text"
        onChange={(e) => setNewPost({title: e.target.value, body: newPost.body})}
      ></input>
      <input
        value={newPost.body}
        placeholder="type your post here..."
        type="text"
        onChange={(e) => setNewPost({title: newPost.title, body: e.target.value})}
      ></input>
      <button onClick={() => post()}>Post</button>
    </div>
  );
};