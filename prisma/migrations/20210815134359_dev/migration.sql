/*
  Warnings:

  - You are about to drop the column `isSuspended` on the `Entry` table. All the data in the column will be lost.
  - You are about to drop the `_Credit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Debit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Credit" DROP CONSTRAINT "_Credit_A_fkey";

-- DropForeignKey
ALTER TABLE "_Credit" DROP CONSTRAINT "_Credit_B_fkey";

-- DropForeignKey
ALTER TABLE "_Debit" DROP CONSTRAINT "_Debit_A_fkey";

-- DropForeignKey
ALTER TABLE "_Debit" DROP CONSTRAINT "_Debit_B_fkey";

-- AlterTable
ALTER TABLE "Entry" DROP COLUMN "isSuspended",
ADD COLUMN     "creditTransactionId" TEXT,
ADD COLUMN     "debitTransactionId" TEXT;

-- DropTable
DROP TABLE "_Credit";

-- DropTable
DROP TABLE "_Debit";

-- AddForeignKey
ALTER TABLE "Entry" ADD FOREIGN KEY ("debitTransactionId") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entry" ADD FOREIGN KEY ("creditTransactionId") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
