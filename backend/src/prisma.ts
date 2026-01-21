import { PrismaClient } from "@prisma/client";

// Initialize Prisma Client for initial database entry point
const prisma = new PrismaClient();

export default prisma;
