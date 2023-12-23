-- CreateTable
CREATE TABLE "CopywriteKnowledge" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "vector" vector,

    CONSTRAINT "CopywriteKnowledge_pkey" PRIMARY KEY ("id")
);
