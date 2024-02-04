interface NewArticle {
  title: string;
  siteId: number;
  content: string;
  contentHash: string;
  url: string;
  contentId: string;
}

interface Article {
  id: number;
  title: string;
  content: string;
  contentHash: string;
  published: boolean;
  siteId: number;
  batchHistoryId: number;
  createdAt: Date;
  updatedAt: Date;
}

interface CrawlingResult {
  siteId: SITE;
  articles: NewArticleRequest[];
  stats: CrawlerStats;
}

interface BatchHistory {
  startAt?: Date;
  endAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

interface RegisteredBatchHistory {
  id: number;
  startAt: Date;
  endAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface CrawlerStats {
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

interface CrawlingResult {
  siteId: SITE;
  articles: NewArticleRequest[];
  stats: CrawlerStats;
}

interface BatchResult {
  crawlingResults: CrawlingResult[];
  batchHistory: BatchHistory;
}

interface UpdateBatchHistory {
  id: number;
  startAt?: Date;
  endAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

interface Site {
  id: number;
  name: string;
}
