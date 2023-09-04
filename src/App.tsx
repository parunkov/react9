import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Post } from './interfaces';

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  const getPosts = () => {
    setLoading(true);
    axios
        .get('https://jsonplaceholder.typicode.com/todos?_start=0&_limit=10')
        .then((res) => {
            setLoading(false);
            console.log(res.data);            
            setPosts(res.data);
        })
        .catch((err) => {
            // Error handling
            setLoading(false);
            console.log(err);
            return null;
        });
};
useEffect(() => {
  getPosts();
}, []);

  return (
    <div className="app">
      <div className="container">
        <div className="header"></div>
        <div className="postsWrapper">
          {posts.map((item) => {
            return <div>{item.title}</div>
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
