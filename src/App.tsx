import { useState } from 'react';
import './App.scss';
import axios from 'axios';
import { IPost } from './interfaces';
import { faker } from '@faker-js/faker';
import InfiniteScroll from 'react-infinite-scroller';
import Post from './components/Post';

function App() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [hasMoreItems, setHasMoreItems] = useState(true);

  const getData = async (page: number): Promise<IPost[] | null> => {
    let data: IPost | null = null;
    await axios
      .get(`https://jsonplaceholder.typicode.com/todos?_start=${page * 10}&_limit=10`)
      .then((res) => {
        if (res.data.length === 0) {
          setHasMoreItems(false);
        } else {
          setHasMoreItems(true);
        }

        res.data.forEach((item: IPost) => {
          const string: string = faker.lorem.text();
          item.text = string;
          const startDate = faker.date.future({ years: 1 });
          item.startDate = startDate;
          item.endDate = faker.date.future({ years: 1, refDate: startDate });
          item.jobArea = faker.person.jobArea();
          item.jobDescriptor = faker.person.jobDescriptor();

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
    const data: IPost[] | null = await getData(page);
    if (data) setPosts([...posts, ...data]);
  };

  const onCheckboxChange = (id: number, value: boolean) => {
    const postIndex = posts.findIndex((item) => item.id === id);
    const newPosts = [...posts];
    newPosts[postIndex].completed = value;
    setPosts(newPosts);
  }

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
            loader={<div className="text-center">loading ...</div>}>
            {posts.map((item) => {
              return <Post 
                key={item.id} 
                id={item.id} 
                completed={item.completed} 
                title={item.title} 
                startDate={item.startDate} 
                endDate={item.endDate}
                text={item.text}
                jobArea={item.jobArea}
                jobDescriptor={item.jobDescriptor}
                onChange={onCheckboxChange}
              />
            })}
          </InfiniteScroll>
          {hasMoreItems ? "" : <div className="text-center">no posts anymore ...</div>}
        </div>
      </div>
    </div>
  );
}

export default App;
