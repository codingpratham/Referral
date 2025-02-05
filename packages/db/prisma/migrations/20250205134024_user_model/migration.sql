-- CreateEnum
CREATE TYPE "Auth_Type" AS ENUM ('Google', 'Github', 'LinkedIn');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "image" TEXT,
ADD COLUMN     "resume" TEXT,
ADD COLUMN     "skills" TEXT;

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "organization" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "password" TEXT NOT NULL,
    "authtype" "Auth_Type" NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");
