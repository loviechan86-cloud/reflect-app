-- Drop the mentor-assignment relation on User (no longer used: every
-- staff member can see every student now).
ALTER TABLE "User" DROP CONSTRAINT "User_mentorId_fkey";
ALTER TABLE "User" DROP COLUMN "mentorId";

-- Collapse the ADMIN/MENTOR roles into a single STAFF role.
ALTER TYPE "Role" RENAME TO "Role_old";
CREATE TYPE "Role" AS ENUM ('STAFF', 'STUDENT');
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role" USING (
  CASE WHEN "role"::text IN ('ADMIN', 'MENTOR') THEN 'STAFF' ELSE "role"::text END
)::"Role";
DROP TYPE "Role_old";

-- Rename Comment.mentorId -> Comment.staffId to match the new role name.
ALTER TABLE "Comment" RENAME COLUMN "mentorId" TO "staffId";
ALTER TABLE "Comment" RENAME CONSTRAINT "Comment_mentorId_fkey" TO "Comment_staffId_fkey";
