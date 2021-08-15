/*
  Warnings:

  - You are about to drop the column `creditTransactionId` on the `Entry` table. All the data in the column will be lost.
  - You are about to drop the column `debitTransactionId` on the `Entry` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Entry" DROP CONSTRAINT "Entry_creditTransactionId_fkey";

-- DropForeignKey
ALTER TABLE "Entry" DROP CONSTRAINT "Entry_debitTransactionId_fkey";

-- AlterTable
ALTER TABLE "Entry" DROP COLUMN "creditTransactionId",
DROP COLUMN "debitTransactionId",
ADD COLUMN     "creditId" TEXT,
ADD COLUMN     "debitId" TEXT;

-- AddForeignKey
ALTER TABLE "Entry" ADD FOREIGN KEY ("debitId") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entry" ADD FOREIGN KEY ("creditId") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
