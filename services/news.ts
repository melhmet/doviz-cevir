import axios from 'axios';
import { Config } from '@/constants/config';
import { cache } from './cache';

export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  image: string | null;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
}

interface GNewsResponse {
  totalArticles: number;
  articles: NewsArticle[];
}

const gnewsApi = axios.create({
  baseURL: Config.GNEWS_API_BASE,
  timeout: Config.API_TIMEOUT_MS,
});

/**
 * Fetch Turkish financial news from GNews API.
 * Uses cache with 15-minute TTL to stay within free tier limits.
 */
export async function fetchFinanceNews(): Promise<NewsArticle[]> {
  // Check cache first
  if (!cache.isExpired(Config.NEWS_CACHE_KEY, Config.NEWS_CACHE_TTL_MS)) {
    const cached = cache.get<NewsArticle[]>(Config.NEWS_CACHE_KEY);
    if (cached && cached.length > 0) return cached;
  }

  try {
    const response = await gnewsApi.get<GNewsResponse>('/top-headlines', {
      params: {
        category: 'business',
        lang: 'tr',
        country: 'tr',
        max: 10,
        apikey: Config.GNEWS_API_KEY,
      },
    });

    const articles = response.data.articles || [];
    if (articles.length > 0) {
      cache.set(Config.NEWS_CACHE_KEY, articles);
    }
    return articles;
  } catch (error) {
    if (__DEV__) console.warn('[GNews API Error]', error);

    // Fallback to stale cache
    const stale = cache.get<NewsArticle[]>(Config.NEWS_CACHE_KEY);
    if (stale && stale.length > 0) return stale;

    return [];
  }
}
