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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Todo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Todo" ("dueAt", "id", "isDone", "title", "userId") SELECT "dueAt", "id", "isDone", "title", "userId" FROM "Todo";
DROP TABLE "Todo";
ALTER TABLE "new_Todo" RENAME TO "Todo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
