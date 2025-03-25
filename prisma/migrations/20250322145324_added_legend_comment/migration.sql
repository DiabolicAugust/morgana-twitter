-- CreateTable
CREATE TABLE "legend_comment" (
    "id" TEXT NOT NULL,
    "legend_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "replyToId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "legend_comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "legend_comment" ADD CONSTRAINT "legend_comment_legend_id_fkey" FOREIGN KEY ("legend_id") REFERENCES "legends"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legend_comment" ADD CONSTRAINT "legend_comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legend_comment" ADD CONSTRAINT "legend_comment_replyToId_fkey" FOREIGN KEY ("replyToId") REFERENCES "legend_comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
