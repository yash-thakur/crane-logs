/*
  Warnings:

  - You are about to drop the column `approvedBy` on the `DailyExpense` table. All the data in the column will be lost.
  - You are about to drop the column `isApproved` on the `DailyExpense` table. All the data in the column will be lost.
  - You are about to drop the column `receipt` on the `DailyExpense` table. All the data in the column will be lost.
  - You are about to drop the column `isReconciled` on the `InwardPayment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Customer` ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `DailyExpense` DROP COLUMN `approvedBy`,
    DROP COLUMN `isApproved`,
    DROP COLUMN `receipt`,
    ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Driver` ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `EntryLog` ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `ExpenseCategory` ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `InwardPayment` DROP COLUMN `isReconciled`,
    ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Vehicle` ADD COLUMN `deletedAt` DATETIME(3) NULL;
