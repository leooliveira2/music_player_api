/*
  Warnings:

  - You are about to alter the column `name` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `lastName` VARCHAR(100) NULL,
    MODIFY `name` VARCHAR(100) NOT NULL,
    MODIFY `email` VARCHAR(255) NOT NULL;
