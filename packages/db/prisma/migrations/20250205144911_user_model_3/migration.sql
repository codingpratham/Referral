/*
  Warnings:

  - Added the required column `fieldOfStudy` to the `Education` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grade` to the `Education` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Education" ADD COLUMN     "fieldOfStudy" TEXT NOT NULL,
ADD COLUMN     "grade" TEXT NOT NULL,
ALTER COLUMN "startDate" SET DATA TYPE TEXT,
ALTER COLUMN "endDate" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Experience" ALTER COLUMN "startDate" SET DATA TYPE TEXT,
ALTER COLUMN "endDate" SET DATA TYPE TEXT;
