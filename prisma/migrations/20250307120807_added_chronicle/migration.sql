-- CreateTable
CREATE TABLE "chronicles" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "images" TEXT[],
    "videos" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chronicles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "chronicles" ADD CONSTRAINT "chronicles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
