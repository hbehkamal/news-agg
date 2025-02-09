'use client';

import { useEffect, useState } from 'react';
import { Post } from '@/types';
import { getNews } from '@/api';
import { BlogCard, BlogHeader, FilterBar } from './components';

export default function Home() {
  const [posts, setPosts] = useState<{ articles: Post[] }[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await getNews();
        setPosts(data);
        console.log('data: ', data);
      } catch (error) {
        console.error('Failed to load posts', error);
      }
    };

    getPosts();
  }, []);

  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 max-w-7xl mx-auto">
      <BlogHeader />

      <FilterBar />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts?.map(
          (post, index) =>
            index < 10 &&
            post.articles.map((article) => (
              <BlogCard key={article.title} post={article} />
            ))
        )}
      </div>
    </section>
  );
}
