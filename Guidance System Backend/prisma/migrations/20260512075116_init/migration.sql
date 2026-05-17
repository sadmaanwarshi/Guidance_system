/*
  Warnings:

  - You are about to drop the column `cgpa` on the `StudentProfile` table. All the data in the column will be lost.
  - You are about to drop the column `personality` on the `StudentProfile` table. All the data in the column will be lost.
  - You are about to drop the column `tenthPercentage` on the `StudentProfile` table. All the data in the column will be lost.
  - You are about to drop the column `twelfthPercentage` on the `StudentProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "StudentProfile" DROP COLUMN "cgpa",
DROP COLUMN "personality",
DROP COLUMN "tenthPercentage",
DROP COLUMN "twelfthPercentage",
ADD COLUMN     "academicType" TEXT,
ADD COLUMN     "certifications" JSONB,
ADD COLUMN     "fullName" TEXT,
ADD COLUMN     "grades" JSONB,
ADD COLUMN     "hobbies" JSONB,
ADD COLUMN     "marks" JSONB,
ADD COLUMN     "percentage" DOUBLE PRECISION,
ADD COLUMN     "personalityTraits" JSONB,
ADD COLUMN     "preferredCareers" JSONB,
ADD COLUMN     "strengths" JSONB,
ADD COLUMN     "subjects" JSONB,
ADD COLUMN     "weaknesses" JSONB;
