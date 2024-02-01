-- CreateTable
CREATE TABLE "Article" (
    "id" SERIAL NOT NULL,
    "siteId" INTEGER NOT NULL,
    "contentId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "contentHash" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Site" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Site_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CrawlerStats" (
    "id" SERIAL NOT NULL,
    "requestsFinished" INTEGER,
    "requestsFailed" INTEGER,
    "retryHistogram" INTEGER[],
    "requestAvgFailedDurationMillis" INTEGER,
    "requestAvgFinishedDurationMillis" INTEGER,
    "requestsFinishedPerMinute" INTEGER,
    "requestsFailedPerMinute" INTEGER,
    "requestTotalDurationMillis" INTEGER,
    "requestsTotal" INTEGER,
    "crawlerRuntimeMillis" INTEGER,
    "siteId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "batchHistoryId" INTEGER NOT NULL,

    CONSTRAINT "CrawlerStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BatchHistory" (
    "id" SERIAL NOT NULL,
    "startAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BatchHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrawlerStats" ADD CONSTRAINT "CrawlerStats_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrawlerStats" ADD CONSTRAINT "CrawlerStats_batchHistoryId_fkey" FOREIGN KEY ("batchHistoryId") REFERENCES "BatchHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
