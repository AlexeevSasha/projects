-- CreateTable
CREATE TABLE "UniqTokenForm" (
    "id" TEXT NOT NULL,
    "token" TEXT,
    "session_id" TEXT,

    CONSTRAINT "UniqTokenForm_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UniqTokenForm_token_key" ON "UniqTokenForm"("token");
