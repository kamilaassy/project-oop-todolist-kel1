/*
  Warnings:

  - You are about to drop the column `status` on the `Todo` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Todo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "dueAt" DATETIME NOT NULL,
    "description" TEXT,
    "isDone" BOOLEAN NOT NULL DEFAULT false,
    "reminderAt" DATETIME
);
INSERT INTO "new_Todo" ("description", "dueAt", "id", "isDone", "reminderAt", "title") SELECT "description", "dueAt", "id", "isDone", "reminderAt", "title" FROM "Todo";
DROP TABLE "Todo";
ALTER TABLE "new_Todo" RENAME TO "Todo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
