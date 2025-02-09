import { Post } from '@/types';

import { Card, CardContent, CardHeader } from '../ui';

export function BlogCard({ post }: { post: Post }) {
  return (
    <Card className="border-0 shadow-none hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <h3 className="text-xl font-semibold leading-tight text-gray-900 hover:text-gray-600 transition-colors">
          <a href={post.url} className="block">
            {post.title}
          </a>
        </h3>
      </CardHeader>
      <CardContent className="space-y-4">
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
