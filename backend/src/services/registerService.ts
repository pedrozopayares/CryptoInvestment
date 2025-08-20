import { db, users } from '../db/connection';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export const registerService = async (username: string, email: string, password: string) => {
  // Verifica si el email ya existe
  const existingEmail = await db.select().from(users)
    .where(eq(users.email, email))
    .limit(1).then((rows: any[]) => rows[0]);
  if (existingEmail) {
    return { error: 'Email already exists.' };
  }
  // Verifica si el username ya existe
  const existingUsername = await db.select().from(users)
    .where(eq(users.username, username))
    .limit(1).then((rows: any[]) => rows[0]);
  if (existingUsername) {
    return { error: 'Username already exists.' };
  }
  // Hashea el password
  const passwordHash = await bcrypt.hash(password, 10);
  // Inserta el usuario
  await db.insert(users).values({ username, email, passwordHash });
  return { success: true };
};
