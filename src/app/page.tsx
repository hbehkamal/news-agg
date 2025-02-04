'use client';

import { useEffect, useState } from 'react';
import { Post } from '@/types';
import { getNews } from '@/api';

import { NewsArticle } from './components/';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await getNews();
        console.log('App.tsx:14 >> data', { data });
        setPosts(data);
      } catch (error) {
        console.error('Failed to load posts', error);
      }
    };

    getPosts();
  }, []);

  return (
    <main>
      <h1>News</h1>
      <ul>
        {posts?.map((post, index) => (
          <NewsArticle
            key={`${post.source.id} ${post.source?.name} ${index}`}
            article={post}
          />
        ))}
      </ul>
    </main>
  );
}
