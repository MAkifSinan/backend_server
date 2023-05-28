-- AlterTable
ALTER TABLE "User" ADD COLUMN "Internship_infos" TEXT;
ALTER TABLE "User" ADD COLUMN "school_number" TEXT;

-- CreateTable
CREATE TABLE "Corporation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "company_name" TEXT,
    "company_title" TEXT,
    "company_address" TEXT,
    "company_working_area" TEXT,
    "company_phone_num" TEXT,
    "company_web_address" TEXT,
    "company_fax_address" TEXT,
    "company_verify" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Internship" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "User_student_name" TEXT NOT NULL,
    "User_school_number" TEXT NOT NULL,
    "company_name" TEXT,
    "company_address" TEXT,
    "company_phone_num" TEXT,
    "company_web_address" TEXT,
    "company_fax_address" TEXT,
    "company_working_area" TEXT,
    "Internship_start_date" TEXT,
    "Internship_end_date" TEXT,
    "Internship_period" TEXT,
    "Internship_type" TEXT,
    "Internship_verify" BOOLEAN NOT NULL,
    "Internship_verifyDays" TEXT,
    "Internship_createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Internship_updatedAt" DATETIME NOT NULL
);
