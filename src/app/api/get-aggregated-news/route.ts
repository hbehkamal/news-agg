import { NextResponse } from 'next/server';
import axios from 'axios';

import { NewsResponse } from '@/types';
import { NEWS_SOURCES } from '../consts';
import { normalizeRequestParams, normalizeResponseData } from './newsService';

export async function GET(req: Request): Promise<Response> {
  try {
    const { searchParams } = new URL(req.url);

    const responses = await Promise.allSettled(
      NEWS_SOURCES.map(async ({ url, name }): Promise<NewsResponse> => {
        const apiKey =
          process.env[`${name.toUpperCase().replace(/ /g, '_')}_API_KEY`] || '';

        const { queryParams, params } = normalizeRequestParams(
          searchParams,
          name,
          apiKey
        );

        try {
          const response = await axios.get<NewsResponse>(
            `${url}?${queryParams}`,
            { params }
          );

          return normalizeResponseData(response, name);
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
