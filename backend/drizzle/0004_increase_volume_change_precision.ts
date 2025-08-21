import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/mysql2';

/**
 * Migration: Increase precision of volume_change_24h in prices table
 */
export async function up(db) {
  await db.execute(sql`ALTER TABLE prices MODIFY COLUMN volume_change_24h DECIMAL(20,8) NULL;`);
}

export async function down(db) {
  await db.execute(sql`ALTER TABLE prices MODIFY COLUMN volume_change_24h DECIMAL(10,4) NULL;`);
}
