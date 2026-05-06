import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "./generated/prisma/client";

const globalForPrisma = globalThis;

function createPrismaClient() {
  // Use DIRECT_URL for serverless (Vercel), DATABASE_URL for regular deployments
  const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
  
  if (!connectionString) {
    throw new Error("DATABASE_URL or DIRECT_URL environment variable is not set");
  }
  
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;