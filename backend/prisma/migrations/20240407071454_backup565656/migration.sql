/*
  Warnings:

  - You are about to drop the `Excel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Excel";

-- CreateTable
CREATE TABLE "DynamicTable" (
    "id" SERIAL NOT NULL,
    "tableName" TEXT NOT NULL,
    "datatypeName" TEXT NOT NULL,
    "headers" JSONB NOT NULL,
    "rows" JSONB NOT NULL,

    CONSTRAINT "DynamicTable_pkey" PRIMARY KEY ("id")
);
