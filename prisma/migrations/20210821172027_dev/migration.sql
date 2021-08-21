/*
  Warnings:

  - A unique constraint covering the columns `[label]` on the table `Head` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Head.label_unique" ON "Head"("label");
