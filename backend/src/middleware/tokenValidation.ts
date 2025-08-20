import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { db, users } from "../db/connection";
import { eq } from "drizzle-orm";

// JWT secret
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

/**
 * Middleware para proteger rutas con JWT
 * - Verifica el token JWT
 * - Busca el usuario en la base de datos
 * - Adjunta el usuario a req.user
 */
export const tokenValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Access Denied: No token provided" });
        }
        const token = authHeader.replace("Bearer ", "");
        let payload: any;
        try {
            payload = jwt.verify(token, JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ error: "Access Denied: Invalid token" });
        }
        // Buscar usuario en la base de datos
        const user = await db.select().from(users).where(eq(users.id, payload.id)).limit(1).then(rows => rows[0]);
        if (!user) {
            return res.status(401).json({ error: "Access Denied: User not found" });
        }
        // Adjuntar usuario al request
        (req as any).user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: "Access Denied" });
    }
};

