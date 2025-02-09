import { URLSearchParams } from 'url';
import { NewsResponse, Post } from '@/types';

export function normalizeRequestParams(
  searchParams: URLSearchParams,
  sourceName: string,
  apiKey: string
): { queryParams: string | URLSearchParams; params: Record<string, unknown> } {
  let queryParams: string | URLSearchParams = new URLSearchParams({
    q: searchParams.get('keyword') || 'tech',
    from: searchParams.get('date') || '',
    category: searchParams.get('category') || '',
    sources: searchParams.get('source') || '',
    authors: searchParams.get('authors') || '',
    pageSize: searchParams.get('pageSize') || '20',
    page: searchParams.get('page') || '1',
  });

  let params: Record<string, unknown> = {};

  if (sourceName === 'The Guardian' || sourceName === 'New York Times') {
    queryParams.set('api-key', apiKey);
  }

  if (sourceName === 'New York Times') {
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

  if (sourceName === 'News API') {
    (queryParams as URLSearchParams).set('apiKey', apiKey);
  }

  return { queryParams, params };
}

export function normalizeResponseData(
  response: any,
  sourceName: string
): NewsResponse {
  let articles: Post[] = [];

  if (sourceName === 'New York Times') {
    articles = response.data.response?.docs.map((doc: any) => ({
      title: doc.headline.main,
      description: doc.abstract,
      url: doc.web_url,
      publishedAt: doc.pub_date,
      source: doc.source,
      author: doc.byline.original,
    }));
  } else if (sourceName === 'The Guardian') {
    articles = response.data.response?.results.map((result: any) => ({
      title: result.webTitle,
      description: result.webTitle,
      url: result.webUrl,
      publishedAt: result.webPublicationDate,
      source: sourceName,
      author: 'N/A',
    }));
  } else if (sourceName === 'News API') {
    articles = response.data.articles.map((article: any) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      publishedAt: article.publishedAt,
      source: article.source.name,
      author: article.author,
    }));
  }

  return { source: sourceName, articles };
}
