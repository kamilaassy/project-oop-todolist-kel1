/*
  Warnings:

  - You are about to drop the `ChecklistItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ChecklistItem";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Todo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "dueAt" DATETIME NOT NULL,
    "description" TEXT,
    "isDone" BOOLEAN NOT NULL DEFAULT false,
    "reminderAt" DATETIME,
    "status" TEXT NOT NULL DEFAULT 'To Do'
);
INSERT INTO "new_Todo" ("description", "dueAt", "id", "isDone", "reminderAt", "title") SELECT "description", "dueAt", "id", "isDone", "reminderAt", "title" FROM "Todo";
DROP TABLE "Todo";
ALTER TABLE "new_Todo" RENAME TO "Todo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
