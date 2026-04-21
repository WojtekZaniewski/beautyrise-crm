import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { config } from "dotenv";

config({ path: ".env.local" });

async function main() {
  const client = postgres(process.env.DATABASE_URL!, { max: 1 });
  const db = drizzle(client);
  await migrate(db, { migrationsFolder: "./supabase/migrations" });
  console.log("✓ Migration done");
  await client.end();
}

main().catch((e) => { console.error(e); process.exit(1); });
