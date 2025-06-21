-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "salt" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Todo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "dueAt" DATETIME NOT NULL,
    "isDone" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Todo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ChecklistItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "isChecked" BOOLEAN NOT NULL DEFAULT false,
    "todoId" INTEGER NOT NULL,
    CONSTRAINT "ChecklistItem_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "Todo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
