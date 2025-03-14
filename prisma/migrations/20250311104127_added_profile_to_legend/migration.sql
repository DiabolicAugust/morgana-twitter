/*
  Warnings:

  - Added the required column `profile_id` to the `legends` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "legends" ADD COLUMN     "profile_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "legends" ADD CONSTRAINT "legends_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
