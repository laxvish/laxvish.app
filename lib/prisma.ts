declare global {
  var prisma: any;
}

let prisma: any = null;

// Lazy load Prisma client only in runtime environments
if (process.env.NODE_ENV !== "production" || process.env.DATABASE_URL) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { PrismaClient } = require("@prisma/client");
    prisma = (global as any).prisma || new PrismaClient();
    if (process.env.NODE_ENV !== "production") {
      (global as any).prisma = prisma;
    }
  } catch (error) {
    // Prisma client not available at build time
    if (process.env.NODE_ENV === "production") {
      throw error;
    }
  }
}

export default prisma;
