-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'WAIVED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "dietaryRestrictions" TEXT,
ADD COLUMN     "emergencyContactName" TEXT,
ADD COLUMN     "emergencyContactPhone" TEXT,
ADD COLUMN     "emergencyContactRelation" TEXT,
ADD COLUMN     "gradeYear" TEXT,
ADD COLUMN     "joinDate" TIMESTAMP(3),
ADD COLUMN     "medicalConditions" TEXT,
ADD COLUMN     "parentEmail" TEXT,
ADD COLUMN     "parentName" TEXT,
ADD COLUMN     "parentPhone" TEXT,
ADD COLUMN     "paymentStatus" "PaymentStatus",
ADD COLUMN     "school" TEXT,
ADD COLUMN     "team" TEXT;
