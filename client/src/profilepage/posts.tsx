import React, { useState } from 'react';
import axios from 'axios';
import { URL } from '../api.http';

interface outPostFormat {
  title: string;
  body: string;
}

interface incPostFormat {
  id: string;
  title: string;
  body: string;
  date: string;
}

//searching through all posts on the front end for a specific post that matches strings/date/id.
//edit the post on the front end by searching and then populating inputs with post-info and then send it to the back end to patch it there.
//create a function to edit posts here
//delete button logic: post = posts.filter((post) => post.id != id)
//write out backend for edit functions
//potentially use redux to get the api calls out of these components

export const Posts = () => {
  const [newPost, setNewPost] = useState<outPostFormat>({
    title: '',
    body: '',
  });
  const [postList, setPostList] = useState<incPostFormat[]>([]);
  const [editingPost, setEditingPost] = useState(false);

//write out patch method on back end to change the post - put "edited on 'date' by new date of edited post"

  const createPost = async () => {
    if (editingPost) {
      await axios.patch(
        `${URL}${'posts'}`,
        { title: newPost.title, body: newPost.body },
        { withCredentials: true }
      );
    } else {
      await axios.post(
        `${URL}${'posts'}`,
        { title: newPost.title, body: newPost.body },
        { withCredentials: true }
      );
      setNewPost({ title: '', body: '' });
    }
  };
  const getPosts = async () => {
    const response = await axios.get(`${URL}${'posts'}`, {
      withCredentials: true,
    });
    setPostList(response.data);
  };
  const editPost = (id: string) => {
    let postToEdit = postList.find((post) => post.id === id);
    console.log(postToEdit);
    if (postToEdit) {
      setNewPost({ title: postToEdit.title, body: postToEdit.body });
    }
    setEditingPost(true);
  };

  //   = async () => {
  //   const response = await axios.patch(`${URL}${'posts'}`, {
  //   });
  //   setPosts(response.data);
  // };
  const deletePost = async (id: string) => {
    await axios.delete(`${URL}${'posts'}/${id}`, {});
    getPosts();
  };

  return (
    <div>
      <div>
        <input
          value={newPost.title}
          placeholder="type your title here..."
          type="text"
          onChange={(e) =>
            setNewPost({ title: e.target.value, body: newPost.body })
          }
        ></input>
        <input
          value={newPost.body}
          placeholder="type your post here..."
          type="text"
          onChange={(e) =>
            setNewPost({ title: newPost.title, body: e.target.value })
          }
        ></input>
        <button onClick={() => createPost()}>Post</button>
      </div>
      <div>
        <button onClick={() => getPosts()}>getAllPosts</button>
        <div>
          {postList.map((post) => (
            <div>
              <h4 key={post.id}>{post.title}</h4>
              <h4>{post.body}</h4>
              <h4>{post.date}</h4>
              <button onClick={() => editPost(post.id)}>Edit</button>
              <button onClick={() => deletePost(post.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
