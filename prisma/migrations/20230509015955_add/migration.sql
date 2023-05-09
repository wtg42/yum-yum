/*
  Warnings:

  - Added the required column `categoryId` to the `FoodItem` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FoodItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_FoodItem" ("createdAt", "id", "name", "price", "updatedAt") SELECT "createdAt", "id", "name", "price", "updatedAt" FROM "FoodItem";
DROP TABLE "FoodItem";
ALTER TABLE "new_FoodItem" RENAME TO "FoodItem";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
