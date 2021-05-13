import React, { useState } from 'react';
import axios from 'axios';

interface incPostFormat {
  title: string;
  body: string;
  date: string;
}

export const Search = () => {
  const [posts, setPosts] = useState<incPostFormat[]>([]);
  const getPosts = async () => {
    const response = await axios.get('http://localhost:8080/posts/All', {
      withCredentials: true,
    });
    setPosts(response.data);
  };

  return (
    <div>
      <button onClick={() => getPosts()}>getAllPosts</button>
      <div>
        {posts.map((post, i) => (
          <div>
            <h4 key={i}>{post.title}</h4>
            <h4>{post.body}</h4>
            <h4>{post.date}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
