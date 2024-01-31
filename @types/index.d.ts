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
  createdAt: Date;
  updatedAt: Date;
}

interface BatchHistory {
  startAt?: Date;
  endAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
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
  batchHistoryId: number;
}

interface BatchHistory {
  startAt?: Date;
  endAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

interface Site {
  id: number;
  name: string;
}
