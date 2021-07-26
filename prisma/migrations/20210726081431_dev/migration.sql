/*
  Warnings:

  - You are about to drop the column `payload` on the `Social` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Social` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `metadata` to the `Social` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Social" DROP COLUMN "payload",
ADD COLUMN     "metadata" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Social_userId_unique" ON "Social"("userId");
