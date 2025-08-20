import type { Request, Response } from 'express';
import { registerService } from '../services/registerService';

export const registerController = {
  async register(req: Request, res: Response) {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email and password are required.' });
    }
    try {
      const result = await registerService(username, email, password);
      if ('error' in result) {
        return res.status(409).json({ error: result.error });
      }
      return res.status(201).json({ message: 'User registered successfully.' });
    } catch (err) {
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }
};
