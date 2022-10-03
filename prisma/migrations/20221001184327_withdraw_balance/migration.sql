-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WithdrawHistory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "isSuccessful" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "dateCreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    CONSTRAINT "WithdrawHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_WithdrawHistory" ("accountNumber", "amount", "bankName", "dateCreated", "id", "isSuccessful", "userId") SELECT "accountNumber", "amount", "bankName", "dateCreated", "id", "isSuccessful", "userId" FROM "WithdrawHistory";
DROP TABLE "WithdrawHistory";
ALTER TABLE "new_WithdrawHistory" RENAME TO "WithdrawHistory";
CREATE UNIQUE INDEX "WithdrawHistory_accountNumber_key" ON "WithdrawHistory"("accountNumber");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
