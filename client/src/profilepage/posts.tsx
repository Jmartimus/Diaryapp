import React, { useState } from 'react';
import axios from 'axios';
import { URL } from '../api.http';
import { useHistory } from 'react-router-dom';
import './posts.scss';
import { Button, FormControl, TextField } from '@material-ui/core';


interface outPostFormat {
  id: number;
  title: string;
  body: string;
}

interface incPostFormat {
  id: number;
  title: string;
  body: string;
  date: string;
}

export const Posts = () => {
  const [post, setPost] = useState<outPostFormat>({
    id: NaN,
    title: '',
    body: '',
  });
  const [recentPost, setRecentPost] = useState<incPostFormat>({
    id: NaN,
    title: '',
    body: '',
    date: '',
  });
  const [postList, setPostList] = useState<incPostFormat[]>([]);
  const [editingPost, setEditingPost] = useState(false);
  const [message, setMessage] = useState('');
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<incPostFormat[]>([]);
  const history = useHistory();

  if (!sessionStorage.getItem('authToken')) {
    history.push('/');
  }

  const createPost = async () => {
    const response = await axios.post(
      `${URL}${'posts'}`,
      { title: post.title, body: post.body },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
        },
      }
    );
    setPost({ id: NaN, title: '', body: '' });
    setRecentPost(response.data);
  };

  const getPosts = async () => {
    const response = await axios.get(`${URL}${'posts'}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
      },
    });
    setPostList(response.data);
  };
  const getPostsbyId = async (id: string) => {
    console.log(id);
    let convertedNumber = parseInt(id);
    const response = await axios.get(`${URL}${'posts'}/${convertedNumber}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
      },
    });
    setRecentPost(response.data);
  };

  const editPost = (id: number) => {
    let postToEdit = postList.find((post) => post.id === id);
    if (postToEdit) {
      setPost({
        id: postToEdit.id,
        title: postToEdit.title,
        body: postToEdit.body,
      });
    }
    setEditingPost(true);
  };
  const patchPost = async (id: number) => {
    if (editingPost) {
      const response = await axios.patch(
        `${URL}${'posts'}/${id}`,
        { title: post.title, body: post.body },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
          },
        }
      );
      console.log(response);
      setPost({ id: NaN, title: '', body: '' });
      setRecentPost(response.data);
    }
  };

  const deletePost = async (id: number) => {
    const response = await axios.delete(`${URL}${'posts'}/${id}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
      },
    });
    setRecentPost({ id: NaN, title: '', body: '', date: '' });
    alert(response.data);
    getPosts();
  };

  const signOut = () => {
    sessionStorage.setItem('authToken', '');
    history.push('/');
  };

  //issues to work through on search bar:
  //1. correct match doesn't show up until 2nd letter
  //2. can't search when title or body is a capital letter
  //3. some letters are in every post and then pull every post on search.  For example: "a".

  const search = (query: string) => {
    setQuery(query);
    if (query === '') {
      setSearchResults([]);
    }
    getPosts();
    query = query.toLowerCase();
    const matches = postList.filter(
      (post) =>
        post.title.includes(query) ||
        post.body.includes(query) ||
        post.date.includes(query)
    );
    if (matches.length === 0 && query !== '') {
      setMessage('No posts match the search criteria');
    } else if (matches && query !== '') {
      setMessage('');
      setSearchResults(matches);
    } else {
      setMessage('');
    }
  };

  const clear = () => {
    setPost({ id: NaN, title: '', body: '' });
    setPostList([]);
    setEditingPost(false);
    setMessage('');
    setQuery('');
    setSearchResults([]);
    setRecentPost({
      id: NaN,
      title: '',
      body: '',
      date: '',
    });
  };

  return (
    <div id="pageFormat">
      <div id="backgroundPosts"></div>
      <div id="postsFormContainer">
        <div>
          <FormControl>
        <TextField
          value={post.title}
          placeholder="type your title here..."
          type="text"
          onChange={(e) =>
            setPost({ id: post.id, title: e.target.value, body: post.body })
          }
        ></TextField>
        <TextField
          value={post.body}
          placeholder="type your post here..."
          type="text"
          onChange={(e) =>
            setPost({ id: post.id, title: post.title, body: e.target.value })
          }
        ></TextField>
        {editingPost ? (
          <Button onClick={() => patchPost(post.id)}>Edit</Button>
        ) : (
          <Button onClick={() => createPost()}>Post</Button>
        )}
            </FormControl>

          <div>
            <FormControl>
        <TextField
          type="search"
          value={query}
          onChange={(e) => search(e.target.value)}
          placeholder="search..."
              />
              </FormControl>
      </div>
      <div>
        <Button onClick={() => clear()}>Clear page</Button>
      </div>
      <div>
        <div>
          {recentPost.title ? (
            <div>
              <h1>{recentPost.title}</h1>
              <p>{recentPost.body}</p>
              <p>Posted: {recentPost.date}</p>
              <Button onClick={() => deletePost(recentPost.id)}>Delete</Button>
            </div>
          ) : (
            ''
          )}
        </div>
        <div>
          {postList.map((post) => (
            <div key={post.id}>
              <h4>{post.title}</h4>
              <h4>{post.body}</h4>
              <h4>{post.date}</h4>
              <Button onClick={() => editPost(post.id)}>Edit</Button>
              <Button onClick={() => deletePost(post.id)}>Delete</Button>
            </div>
          ))}
        </div>
        <div>
          {searchResults.map((post) => (
            <div key={post.id}>
              <h4>{post.title}</h4>
              <h4>{post.body}</h4>
              <h4>{post.date}</h4>
              <Button onClick={() => editPost(post.id)}>Edit</Button>
              <Button onClick={() => deletePost(post.id)}>Delete</Button>
            </div>
          ))}
          <h1>{message}</h1>
        </div>
          <Button onClick={signOut}>signout</Button>
      </div>
      </div>
      </div>
      </div>
  );
};
