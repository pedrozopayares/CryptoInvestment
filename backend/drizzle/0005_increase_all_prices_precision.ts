import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/mysql2';

/**
 * Migration: Increase precision of all relevant decimal fields in prices table to (50,10) or (20,8)
 */
export async function up(db) {
  await db.execute(sql`ALTER TABLE prices MODIFY COLUMN price DECIMAL(50,10) NOT NULL;`);
  await db.execute(sql`ALTER TABLE prices MODIFY COLUMN market_cap DECIMAL(50,10) NULL;`);
  await db.execute(sql`ALTER TABLE prices MODIFY COLUMN volume_24h DECIMAL(50,10) NULL;`);
  await db.execute(sql`ALTER TABLE prices MODIFY COLUMN percent_change_1h DECIMAL(20,8) NULL;`);
  await db.execute(sql`ALTER TABLE prices MODIFY COLUMN percent_change_24h DECIMAL(20,8) NULL;`);
  await db.execute(sql`ALTER TABLE prices MODIFY COLUMN percent_change_7d DECIMAL(20,8) NULL;`);
  await db.execute(sql`ALTER TABLE prices MODIFY COLUMN market_cap_dominance DECIMAL(20,8) NULL;`);
  await db.execute(sql`ALTER TABLE prices MODIFY COLUMN fully_diluted_market_cap DECIMAL(50,10) NULL;`);
  await db.execute(sql`ALTER TABLE prices MODIFY COLUMN volume_change_24h DECIMAL(50,10) NULL;`);
}

export async function down(db) {
  await db.execute(sql`ALTER TABLE prices MODIFY COLUMN price DECIMAL(20,8) NOT NULL;`);
  await db.execute(sql`ALTER TABLE prices MODIFY COLUMN market_cap DECIMAL(30,10) NULL;`);
  await db.execute(sql`ALTER TABLE prices MODIFY COLUMN volume_24h DECIMAL(30,10) NULL;`);
  await db.execute(sql`ALTER TABLE prices MODIFY COLUMN percent_change_1h DECIMAL(10,4) NULL;`);
  await db.execute(sql`ALTER TABLE prices MODIFY COLUMN percent_change_24h DECIMAL(10,4) NULL;`);
  await db.execute(sql`ALTER TABLE prices MODIFY COLUMN percent_change_7d DECIMAL(10,4) NULL;`);
  await db.execute(sql`ALTER TABLE prices MODIFY COLUMN market_cap_dominance DECIMAL(10,4) NULL;`);
  await db.execute(sql`ALTER TABLE prices MODIFY COLUMN fully_diluted_market_cap DECIMAL(30,10) NULL;`);
  await db.execute(sql`ALTER TABLE prices MODIFY COLUMN volume_change_24h DECIMAL(20,8) NULL;`);
}
