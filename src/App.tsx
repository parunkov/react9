import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Post } from './interfaces';
import { faker } from '@faker-js/faker';

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  const getData = async (page: number): Promise<Post[] | null> => {
    let data: Post | null = null;
    await axios
        .get(`https://jsonplaceholder.typicode.com/todos?_start=${page}&_limit=10`)
        .then((res) => {
            setLoading(false);
            console.log(res.data); 
            res.data.forEach((item: Post) => {
              const string: string = faker.lorem.text();
              item.text = string;
              const startDate = faker.date.future({ years: 1 });
              const endDate = faker.date.future({ years: 1, refDate: startDate });
              item.startDate = startDate;
              item.endDate = endDate;
            });
            data = res.data;           
        })
        .catch((err) => {
            setLoading(false);
            console.log(err);
            data = null;
        });
    return data;
  }

  const getPosts = async () => {
    setLoading(true);
    const data: Post[] | null = await getData(page);
    if (data) setPosts(data);
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
            return <div key={item.id}>{item.title}</div>
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
