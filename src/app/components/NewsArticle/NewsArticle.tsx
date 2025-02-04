import Image from 'next/image';
import { FC } from 'react';

interface NewsArticleProps {
  article: {
    source: { id: string | null; name: string };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
  };
}

const NewsArticle: FC<NewsArticleProps> = ({ article }) => {
  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-4 border border-gray-200">
      {/* Article Image */}
      {article.urlToImage && (
        <Image
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-56 object-cover rounded-lg"
          width={400}
          height={200}
        />
      )}

      {/* Article Content */}
      <div className="mt-4">
        <h2 className="text-xl font-bold">{article.title}</h2>

        {/* Source and Date */}
        <p className="text-gray-500 text-sm mt-1">
          {article.source.name} •{' '}
          {new Date(article.publishedAt).toLocaleDateString()}
        </p>

        {/* Author */}
        {article.author && (
          <p className="text-gray-600 text-sm mt-1">By {article.author}</p>
        )}

        {/* Description */}
        <p className="text-gray-700 mt-3">{article.description}</p>

        {/* Read More */}
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline mt-3 inline-block"
        >
          Read more →
        </a>
      </div>
    </div>
  );
};

export default NewsArticle;
