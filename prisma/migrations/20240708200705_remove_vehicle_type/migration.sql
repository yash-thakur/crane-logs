/*
  Warnings:

  - You are about to drop the column `type` on the `Vehicle` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Driver` MODIFY `aadhar` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Vehicle` DROP COLUMN `type`;
