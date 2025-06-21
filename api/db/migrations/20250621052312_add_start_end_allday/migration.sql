/*
  Warnings:

  - You are about to drop the `UserExample` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `dueAt` on the `Todo` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "UserExample_email_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UserExample";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Todo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "startAt" DATETIME,
    "endAt" DATETIME,
    "allDay" BOOLEAN NOT NULL DEFAULT false,
    "isDone" BOOLEAN NOT NULL DEFAULT false,
    "reminderAt" DATETIME
);
INSERT INTO "new_Todo" ("description", "id", "isDone", "reminderAt", "title") SELECT "description", "id", "isDone", "reminderAt", "title" FROM "Todo";
DROP TABLE "Todo";
ALTER TABLE "new_Todo" RENAME TO "Todo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
