export interface NewsSource {
  name: string;
  url: string;
}

export interface Post {
  source: {
    id: string | null;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface NewsResponse {
  source: string;
  response?: { docs: Post[] };
  articles?: Post[];
  error?: string;
}
