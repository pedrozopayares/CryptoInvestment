import { db, users } from '../db/connection';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';
const JWT_EXPIRES_IN = '2h';

// Simple in-memory blacklist for signout (for demo; use Redis in prod)
const tokenBlacklist = new Set<string>();

export const authService = {
  async signin(email: string, password: string) {
    const user = await db.select().from(users).where(eq(users.email, email)).limit(1).then(rows => rows[0]);
    if (!user) return { error: 'Credenciales inválidas.' };
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return { error: 'Credenciales inválidas.' };
    const token = jwt.sign({ id: user.id, email: user.email, username: user.username }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    return { token };
  },
  signout(token: string) {
    tokenBlacklist.add(token);
    return { message: 'Sesión finalizada.' };
  },
  isTokenBlacklisted(token: string) {
    return tokenBlacklist.has(token);
  }
};
