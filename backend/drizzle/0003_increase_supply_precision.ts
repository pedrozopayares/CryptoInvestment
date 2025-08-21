import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/mysql2';

/**
 * Migration: Increase precision of circulating_supply, total_supply, and max_supply
 */
export async function up(db) {
  await db.execute(sql`ALTER TABLE cryptocurrencies MODIFY COLUMN circulating_supply DECIMAL(38,10) NULL;`);
  await db.execute(sql`ALTER TABLE cryptocurrencies MODIFY COLUMN total_supply DECIMAL(38,10) NULL;`);
  await db.execute(sql`ALTER TABLE cryptocurrencies MODIFY COLUMN max_supply DECIMAL(38,10) NULL;`);
}

export async function down(db) {
  await db.execute(sql`ALTER TABLE cryptocurrencies MODIFY COLUMN circulating_supply DECIMAL(30,10) NULL;`);
  await db.execute(sql`ALTER TABLE cryptocurrencies MODIFY COLUMN total_supply DECIMAL(30,10) NULL;`);
  await db.execute(sql`ALTER TABLE cryptocurrencies MODIFY COLUMN max_supply DECIMAL(30,10) NULL;`);
}
