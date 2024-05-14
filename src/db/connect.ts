import * as schema from "./schema";
import postgres from "postgres";
import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";

export type DrizzleDb = PostgresJsDatabase<typeof schema>;

const pgClient = postgres(Bun.env.POSTGRES_CONNECTION_STRING, { max: 97 });
const drizzleDb = drizzle(pgClient, { schema });

export function dbConnect(): DrizzleDb {
  return drizzleDb;
}
