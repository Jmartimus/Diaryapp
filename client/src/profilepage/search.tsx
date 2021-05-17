import React, { useState } from 'react';
import {URL} from '../api.http'
import axios from 'axios';

interface incPostFormat {
  id: string;
  title: string;
  body: string;
  date: string;
}

export const Search = () => {
  // const [posts, setPosts] = useState<incPostFormat[]>([]);
  // const getPosts = async () => {
  //   const response = await axios.get(`${URL}${'posts'}`, {
  //     withCredentials: true,
  //   });
  //   setPosts(response.data);
  // };
  // const editPost = (id: string) => {
  //   let postToEdit = posts.find(post => post.id === id)
  //   console.log(postToEdit);
  // }
  // //   = async () => {
  // //   const response = await axios.patch(`${URL}${'posts'}`, {
  // //   });
  // //   setPosts(response.data);
  // // };
  // const deletePost = async (id: string) => {
  //   await axios.delete(`${URL}${'posts'}/${id}`, {
  //   })
  //   getPosts();
  // }

  return (
    <div></div>
    // <div>
    //   <button onClick={() => getPosts()}>getAllPosts</button>
    //   <div>
    //     {posts.map((post) => (
    //       <div>
    //         <h4 key={post.id}>{post.title}</h4>
    //         <h4>{post.body}</h4>
    //         <h4>{post.date}</h4>
    //         <button onClick={() => editPost(post.id)}>Edit</button>
    //         <button onClick={() => deletePost(post.id)}>Delete</button>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
};
