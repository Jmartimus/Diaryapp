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

//searching through all posts on the front end for a specific post that matches strings/date/id.
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
  const [foundPost, setFoundPost] = useState<incPostFormat[]>([]);
  const [postNotFound, setPostNotFound] = useState('');
  const [searchResults, setSearchResults] = useState<incPostFormat[]>([]);

  //don't forget about the search bar!! Only use on front end - Get all posts, search bar searches through all posts for tag words

  const createPost = async (id: string) => {
    if (editingPost) {
      const response = await axios.patch(
        `${URL}${'posts'}/${id}`,
        { title: post.title, body: post.body },
        { withCredentials: true }
      );
      console.log(response);
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

  //figure out how to make query match even 1 letter of title, body, date.
  //figure out how to clear list of posts when letters are erased only where applicable.
  //make a message if no posts were found.
  const search = (query: string) => {
    setQuery(query);
    if (query === '') {
      setFoundPost([]);
    }
    getPosts();
    query = query.toLowerCase();
    const matches = postList.filter(
      (post) =>
        post.title.includes(query) ||
        post.body.includes(query) ||
        post.date.includes(query)
    );
    if (matches && query !== '') {
      setSearchResults(matches);
    } else if (!matches) {
      setPostNotFound('No posts match the search criteria');
    }
  };
  //issues to work through on search bar:
  //1. correct match doesn't show up until 2nd letter
  //2. also, only one potential match show up. For example: if 2 search results match, only one shows until enough letters are typed. Have to use .filter I think.
  // const search = (query: string) => {
  //   setQuery(query);
  //   if (query === '') {
  //     setFoundPost([]);
  //   }
  //   getPosts();
  //   query = query.toLowerCase();
  //   const match = postList.find((post) => post.title.includes(query) || post.body.includes(query) || post.date.includes(query));
  //   const matches = postList.filter((post) => post.title.includes(query) || post.body.includes(query) || post.date.includes(query));
  //   setSearchResults(matches)
  //   if (match && query !== '') {
  //     setFoundPost([match]);
  //   } else if (!match){
  //     setPostNotFound('No posts match the search criteria');
  //   }
  // };
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
        <button onClick={() => getPosts()}>getAllPosts</button>
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
