export enum SITE {
  CLASSMETHOD = 10 as number,
  CYBOZUSHIKI = 20,
  SONICGARDEN = 30,
  FREEE = 40,
  SANSAN = 50,
  MERCARI = 60,
}

export interface RegisteredCrawlerStats {
  id: number;
  requestsFinished: number | null;
  requestsFailed: number | null;
  retryHistogram: number[];
  requestAvgFailedDurationMillis: number | null;
  requestAvgFinishedDurationMillis: number | null;
  requestsFinishedPerMinute: number | null;
  requestsFailedPerMinute: number | null;
  requestTotalDurationMillis: number | null;
  requestsTotal: number | null;
  crawlerRuntimeMillis: number | null;
  siteId: SITE;
}

export interface RegisteredBatchHistory {
  id: number;
  startAt: string;
  endAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Article {
  id: number;
  title: string;
  content: string;
  contentHash: string;
  published: boolean;
  url: string;
  siteId: number;
  ogpTitle: string | null;
  ogpImage: string | null;
  ogpDescription: string | null;
  batchHistoryId: number;
  createdAt: string;
  updatedAt: string;
}

interface Site {
  id: number;
  name: string;
  name_ja: string;
  createdAt: string;
  updatedAt: string;
}

interface CrawlerStatsWithSite extends RegisteredCrawlerStats {
  Site: Site;
}

export interface AppHistories extends RegisteredBatchHistory {
  CrawlerStats: CrawlerStatsWithSite[];
}
