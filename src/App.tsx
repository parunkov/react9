import { useState } from 'react';
import './App.css';
import axios from 'axios';
import { Post } from './interfaces';
import { faker } from '@faker-js/faker';
import InfiniteScroll from 'react-infinite-scroller';

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasMoreItems, setHasMoreItems] = useState(true);

  const getData = async (page: number): Promise<Post[] | null> => {
    let data: Post | null = null;
    await axios
      .get(`https://jsonplaceholder.typicode.com/todos?_start=${page * 10}&_limit=10`)
      .then((res) => {
        if (res.data.length === 0) {
          setHasMoreItems(false);
        } else {
          setHasMoreItems(true);
        }

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
        console.log(err);
        data = null;
      });

    return data;
  }

  const getPosts = async (page: number) => {
    const data: Post[] | null = await getData(page);
    if (data) setPosts([...posts, ...data]);
  };

  return (
    <div className="app">
      <div className="container">
        <div className="header"></div>
        <div className="postsWrapper">
          <InfiniteScroll
            threshold={50}
            pageStart={-1}
            loadMore={getPosts}
            hasMore={hasMoreItems}
            loader={<div className="text-center">loading data ...</div>}>
            {posts.map((item) => {
              return item.id && <div className='post' key={item.id}>{item.id}</div>
            })}
          </InfiniteScroll>
          {hasMoreItems ? "" : <div className="text-center">no data anymore ...</div>}
        </div>
      </div>
    </div>
  );
}

export default App;
