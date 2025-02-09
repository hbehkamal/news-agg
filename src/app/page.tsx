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
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-8">
        {posts?.map((post) =>
          post.articles.map((article) => (
            <BlogCard key={article.title} post={article} />
          ))
        )}
      </div>
    </section>
  );
}
