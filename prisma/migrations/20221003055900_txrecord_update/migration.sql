/*
  Warnings:

  - Added the required column `amountToReceive` to the `TxRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `TxRecord` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TxRecord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "amount" INTEGER NOT NULL,
    "network" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "email" TEXT NOT NULL,
    "amountToReceive" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    CONSTRAINT "TxRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_TxRecord" ("amount", "createdAt", "id", "network", "phone", "userId") SELECT "amount", "createdAt", "id", "network", "phone", "userId" FROM "TxRecord";
DROP TABLE "TxRecord";
ALTER TABLE "new_TxRecord" RENAME TO "TxRecord";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
