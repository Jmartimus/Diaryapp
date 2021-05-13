import React, { useState } from 'react';
import axios from 'axios';

interface outPostFormat {
  title: string,
  body: string,
}

//create a function to delete and edit posts here
//write out backend for delete and edit functions
//potentially use redux to get the api calls out of these components

export const Posts = () => {
  const [newPost, setNewPost] = useState<outPostFormat>({
    title: '',
    body: '',
  });

 const createPost = async () => {
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
      <button onClick={() => createPost()}>Post</button>
    </div>
  );
};