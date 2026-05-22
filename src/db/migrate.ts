import { runMigrations } from "@kilocode/app-builder-db";

const dbUrl = process.env.DB_URL;
const dbToken = process.env.DB_TOKEN;

if (!dbUrl || !dbToken) {
  console.log("Skipping database migrations: DB_URL and DB_TOKEN not configured.");
  console.log("Migrations will run automatically in the production environment.");
  process.exit(0);
}

const { db } = await import("./index");

try {
  await runMigrations(db, {}, { migrationsFolder: "./src/db/migrations" });
  console.log("Database migrations completed successfully.");
} catch (error) {
  console.error("Database migration failed:", error);
  process.exit(1);
}
