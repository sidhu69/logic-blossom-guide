import { defineConfig } from "drizzle-kit";

// Disabled - using Supabase instead
export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL || "postgresql://disabled",
  },
});
