import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

// For now, use a simple in-memory setup to get the admin panel working
console.log("🗄️ Using mock database setup for development");

// Mock database connection
export const db = {
  select: (columns?: any) => ({
    from: (table: any) => ({
      where: (condition: any) => Promise.resolve([]),
      limit: (limit?: number) => Promise.resolve([]),
      orderBy: (order: any) => ({
        limit: (limit?: number) => Promise.resolve([])
      })
    })
  }),
  insert: () => ({ values: () => ({ returning: () => Promise.resolve([]) }) }),
  update: () => ({ set: () => ({ where: () => ({ returning: () => Promise.resolve([]) }) }) }),
  delete: () => ({ where: () => Promise.resolve([]) }),
  query: {
    users: { findMany: () => Promise.resolve([]) },
    products: { findMany: () => Promise.resolve([]) },
    orders: { findMany: () => Promise.resolve([]) },
  }
} as any;

// Mock table exports for dashboard
export const usersTable = { name: 'users' };
export const ordersTable = { name: 'orders', total: 'total', createdAt: 'createdAt' };
export const productsTable = { name: 'products' };

// Mock drizzle functions
export const count = () => ({ name: 'count' });
export const sum = (column: any) => ({ name: 'sum', column });
export const desc = (column: any) => ({ name: 'desc', column });

export * from "./schema";
