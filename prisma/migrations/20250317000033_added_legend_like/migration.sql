-- CreateTable
CREATE TABLE "legend_like" (
    "id" TEXT NOT NULL,
    "legend_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "legend_like_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "legend_like" ADD CONSTRAINT "legend_like_legend_id_fkey" FOREIGN KEY ("legend_id") REFERENCES "legends"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legend_like" ADD CONSTRAINT "legend_like_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
