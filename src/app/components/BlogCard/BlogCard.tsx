import { Post } from '@/types';

import { Card, CardContent, CardHeader } from '../ui';
import Image from 'next/image';

export function BlogCard({ post }: { post: Post }) {
  return (
    <Card className="break-inside-avoid mb-8 p-4 bg-white rounded-lg shadow-md transition-shadow duration-200 hover:shadow-lg">
      <CardHeader>
        {post.urlToImage ? (
          <div className="aspect-[4/3] overflow-hidden rounded-lg mb-6">
            <Image
              src={post.urlToImage || '/placeholder.svg'}
              alt={post.title}
              width={500}
              height={375}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
            />
          </div>
        ) : (
          <h3 className="text-xl font-semibold leading-tight text-gray-900 hover:text-gray-600 transition-colors">
            <a href={post.url} className="block">
              {post.title}
            </a>
          </h3>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {post.urlToImage && (
          <h3 className="text-xl font-semibold leading-tight text-gray-900 hover:text-gray-600 transition-colors">
            <a href={post.url} className="block">
              {post.title}
            </a>
          </h3>
        )}
        <div>
          {/* Source and Date */}
          <p className="text-gray-500 text-sm mt-1">
            {post.source} • {new Date(post.publishedAt).toLocaleDateString()}
          </p>

          {/* Author */}
          {post.author && (
            <p className="text-gray-600 text-sm mt-1">By {post.author}</p>
          )}
        </div>

        <p className="text-gray-600 line-clamp-3">{post.description}</p>
      </CardContent>
    </Card>
  );
}
