import { PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

declare global {
  var prismaClient: PrismaClient | undefined;
}

export function getPrismaClient(): PrismaClient | null {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  if (!globalThis.prismaClient) {
    const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
    globalThis.prismaClient = new PrismaClient({ adapter });
  }

  return globalThis.prismaClient;
}
