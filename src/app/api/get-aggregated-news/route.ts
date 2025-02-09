import { NextResponse } from 'next/server';
import axios from 'axios';

import { NewsResponse, Post } from '@/types';

import { NEWS_SOURCES } from '../consts';

export async function GET(req: Request): Promise<Response> {
  try {
    const { searchParams } = new URL(req.url);
    const keyword: string = searchParams.get('keyword') || '';
    const date: string = searchParams.get('date') || '';
    const category: string = searchParams.get('category') || '';
    const source: string = searchParams.get('source') || '';
    const authors: string = searchParams.get('authors') || '';
    const pageSize: number = parseInt(searchParams.get('pageSize') || '20', 10);
    const page: number = parseInt(searchParams.get('page') || '1', 10);

    const responses = await Promise.allSettled(
      NEWS_SOURCES.map(async ({ url, name }): Promise<NewsResponse> => {
        const apiKey =
          process.env[`${name.toUpperCase().replace(/ /g, '_')}_API_KEY`] || '';

        let queryParams: string | URLSearchParams = new URLSearchParams({
          q: keyword || 'tech',
          from: date,
          category,
          sources: source,
          authors,
          pageSize: pageSize.toString(),
          page: page.toString(),
        });

        if (name == 'The Guardian' || name == 'New York Times')
          queryParams.set('api-key', apiKey);

        let params: Record<string, unknown> = {};
        if (name == 'New York Times') {
          // queryParams = `q=tech&api-key=${apiKey}`;
          const query = searchParams.get('query') || '';
          const page = searchParams.get('page') || '0';
          const beginDate = searchParams.get('begin_date') || '';
          const endDate = searchParams.get('end_date') || '';
          const sort = searchParams.get('sort') || 'relevance'; // relevance, newest, oldest
          params = {
            q: query,
            page,
            sort,
            'api-key': apiKey,
          };
          if (beginDate) params.begin_date = beginDate;
          if (endDate) params.end_date = endDate;
          queryParams = '';
        }

        if (name == 'News API')
          (queryParams as URLSearchParams).set('apiKey', apiKey);

        try {
          const response = await axios.get<NewsResponse>(
            `${url}?${queryParams}`,
            { params }
          );

          let data;

          if (name == 'New York Times') {
            data = {
              articles: response.data.response?.docs,
              source: name,
            };
          } else {
            data = response.data as {
              articles?: Post[];
              response?: { results?: Post[]; docs?: Post[] };
            };
          }

          const mergedArticles = data.articles || data.response?.results || [];

          return { source: name, articles: mergedArticles };
        } catch (error: any) {
          console.error(error);
          return { source: name, error: error.message };
        }
      })
    );

    const aggregatedData: NewsResponse[] = responses
      .filter((res) => res.status === 'fulfilled')
      .map((res) => (res as PromiseFulfilledResult<NewsResponse>).value);

    return NextResponse.json(aggregatedData);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
