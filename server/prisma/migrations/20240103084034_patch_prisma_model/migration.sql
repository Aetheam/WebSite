-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "rank" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_user" ("email", "id", "password", "rank", "username") SELECT "email", "id", "password", "rank", "username" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
