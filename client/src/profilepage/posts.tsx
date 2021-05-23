import React, { useState } from 'react';
import axios from 'axios';
import { URL } from '../api.http';

interface outPostFormat {
  id: string;
  title: string;
  body: string;
}

interface incPostFormat {
  id: string;
  title: string;
  body: string;
  date: string;
}

//potentially use redux to get the api calls out of these components

export const Posts = () => {
  const [post, setPost] = useState<outPostFormat>({
    id: '',
    title: '',
    body: '',
  });
  const [postList, setPostList] = useState<incPostFormat[]>([]);
  const [editingPost, setEditingPost] = useState(false);
  const [message, setMessage] = useState('');
  const [query, setQuery] = useState('');
  const [postNotFound, setPostNotFound] = useState('');
  const [searchResults, setSearchResults] = useState<incPostFormat[]>([]);

  const createPost = async (id: string) => {
    if (editingPost) {
      const response = await axios.patch(
        `${URL}${'posts'}/${id}`,
        { title: post.title, body: post.body },
        { withCredentials: true }
      );
      setPost({ id: '', title: '', body: '' });
      setMessage(response.data);
      getPosts();
    } else {
      const response = await axios.post(
        `${URL}${'posts'}`,
        { id: '', title: post.title, body: post.body },
        { withCredentials: true }
      );
      setPost({ id: '', title: '', body: '' });
      setMessage(response.data);
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
    if (postToEdit) {
      setPost({
        id: postToEdit.id,
        title: postToEdit.title,
        body: postToEdit.body,
      });
    }
    setEditingPost(true);
  };

  const deletePost = async (id: string) => {
    const response = await axios.delete(`${URL}${'posts'}/${id}`, {});
    getPosts();
    setMessage(response.data);
  };

  //issues to work through on search bar:
  //1. correct match doesn't show up until 2nd letter
  //2. can't search when title or body is a capital letter
  //3. some letters are in every post and then pull every post on search.  For example: "a".

  const search = (query: string) => {
    setPostNotFound('');
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
      setPostNotFound('No posts match the search criteria');
    } else if (matches && query !== '') {
      setSearchResults(matches);
    }
  };

  const clear = () => {
    setPost({ id: '', title: '', body: '' });
    setPostList([]);
    setEditingPost(false);
    setMessage('');
    setQuery('');
    setPostNotFound('');
    setSearchResults([]);
  };

  return (
    <div>
      <div>
        <input
          value={post.title}
          placeholder="type your title here..."
          type="text"
          onChange={(e) =>
            setPost({ id: post.id, title: e.target.value, body: post.body })
          }
        ></input>
        <input
          value={post.body}
          placeholder="type your post here..."
          type="text"
          onChange={(e) =>
            setPost({ id: post.id, title: post.title, body: e.target.value })
          }
        ></input>
        <button onClick={() => createPost(post.id)}>Post</button>
      </div>
      <div>
        <input
          type="search"
          value={query}
          onChange={(e) => search(e.target.value)}
          placeholder="search..."
        />
      </div>
      <div>
        <button onClick={() => clear()}>Clear page</button>
      </div>
      <div>
        <div>
          {searchResults.map((post) => (
            <div key={post.id}>
              <h4>{post.title}</h4>
              <h4>{post.body}</h4>
              <h4>{post.date}</h4>
              <button onClick={() => editPost(post.id)}>Edit</button>
              <button onClick={() => deletePost(post.id)}>Delete</button>
            </div>
          ))}
          <h1>{postNotFound}</h1>
        </div>
        {/*eventually, delete the post list from showing on the website*/}
        <h1>{message}</h1>
      </div>
    </div>
  );
};
