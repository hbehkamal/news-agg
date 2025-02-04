import { Post } from '@/types';
import axios from 'axios';

export const getNews = async (): Promise<Post[]> => {
  try {
    // TODO: add parameters
    const response = await axios.get('/api/get-aggregated-news');

    return response.data as Post[];
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};
