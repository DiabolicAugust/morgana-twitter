-- CreateTable
CREATE TABLE "chronicle_like" (
    "id" TEXT NOT NULL,
    "chronicle_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chronicle_like_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "chronicle_like_chronicle_id_user_id_key" ON "chronicle_like"("chronicle_id", "user_id");

-- AddForeignKey
ALTER TABLE "chronicle_like" ADD CONSTRAINT "chronicle_like_chronicle_id_fkey" FOREIGN KEY ("chronicle_id") REFERENCES "chronicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chronicle_like" ADD CONSTRAINT "chronicle_like_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
