import { db, users } from '../db/connection';
import { eq } from 'drizzle-orm';

export const userService = {
  getUser: async (userId: number) => {
    const user = await db.select().from(users).where(eq(users.id, userId)).limit(1).then((rows: any[]) => rows[0]);
    if (!user) return null;
    // No retornamos el passwordHash
    const { passwordHash, ...userData } = user;
    return userData;
  }
};
