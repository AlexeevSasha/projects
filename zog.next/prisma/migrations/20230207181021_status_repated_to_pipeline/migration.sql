/*
  Warnings:

  - Added the required column `pipelineId` to the `PipelineStatus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PipelineStatus" ADD COLUMN     "pipelineId" INTEGER NOT NULL;
