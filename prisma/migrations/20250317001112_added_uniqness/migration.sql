/*
  Warnings:

  - A unique constraint covering the columns `[legend_id,user_id]` on the table `legend_like` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "legend_like_legend_id_user_id_key" ON "legend_like"("legend_id", "user_id");
