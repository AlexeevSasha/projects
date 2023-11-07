-- CreateTable
CREATE TABLE "WebHook" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "key" TEXT,
    "status" TEXT NOT NULL DEFAULT 'new',
    "error" TEXT,
    "method" TEXT,
    "query" JSONB,
    "post" JSONB,
    "headers" JSONB,
    "cookies" JSONB,
    "ipv4" TEXT,
    "result" JSONB,

    CONSTRAINT "WebHook_pkey" PRIMARY KEY ("id")
);
