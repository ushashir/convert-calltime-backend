/*
  Warnings:

  - You are about to drop the column `dateCreated` on the `WithdrawHistory` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WithdrawHistory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "isSuccessful" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    CONSTRAINT "WithdrawHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_WithdrawHistory" ("accountNumber", "amount", "bankName", "id", "isSuccessful", "userId") SELECT "accountNumber", "amount", "bankName", "id", "isSuccessful", "userId" FROM "WithdrawHistory";
DROP TABLE "WithdrawHistory";
ALTER TABLE "new_WithdrawHistory" RENAME TO "WithdrawHistory";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
