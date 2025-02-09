import { Post } from '@/types';
import axios from 'axios';

export const getNews = async (): Promise<{ articles: Post[] }[]> => {
  try {
    // TODO: add parameters
    const response = await axios.get('/api/get-aggregated-news');

    return response.data as { articles: Post[] }[];
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};
