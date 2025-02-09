export interface NewsSource {
  name: string;
  url: string;
}

export interface Post {
  source: string;
  author: string;
  title: string;
  description: string;
  url: string;
  publishedAt: string;
}

export interface NewsResponse {
  source: string;
  response?: { docs: Post[] };
  articles?: Post[];
  error?: string;
}
