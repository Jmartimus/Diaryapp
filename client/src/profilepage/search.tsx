import React, { useState } from 'react';
import {URL} from '../api.http'
import axios from 'axios';

interface incPostFormat {
  id: number;
  title: string;
  body: string;
  date: string;
}

export const Search = () => {
  const [posts, setPosts] = useState<incPostFormat[]>([]);
  const getPosts = async () => {
    const response = await axios.get(`${URL}${'posts/All'}`, {
      withCredentials: true,
    });
    setPosts(response.data);
  };
  const editPost = async () => {
    const response = await axios.patch(`${URL}${'posts/edit'}`, {
    });
    setPosts(response.data);
  };
  const deletePost = async (id: number) => {
    console.log(`${URL}${'posts'}/:${id}`)
    await axios.delete(`${URL}${'posts'}/:${id}`, {
    })
    getPosts();
  }

  //fix delete button

  return (
    <div>
      <button onClick={() => getPosts()}>getAllPosts</button>
      <div>
        {posts.map((post, i) => (
          <div>
            <h4 key={i}>{post.title}</h4>
            <h4>{post.body}</h4>
            <h4>{post.date}</h4>
            <button onClick={() => editPost()}>Edit</button>
            <button onClick={() => deletePost(post.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};
