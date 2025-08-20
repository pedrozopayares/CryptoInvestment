import type { Request, Response } from 'express';
import { authService } from '../services/authService';

export const authController = {
  async signin(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }
    try {
      const result = await authService.signin(email, password);
      if ('error' in result) {
        return res.status(401).json({ error: result.error });
      }
      return res.status(200).json({ token: result.token });
    } catch (err) {
      return res.status(500).json({ error: 'Internal server error.' });
    }
  },
  signout(req: Request, res: Response) {
    const auth = req.headers['authorization'];
    if (!auth || !auth.startsWith('Bearer ')) {
      return res.status(400).json({ error: 'No token provided.' });
    }
    const token = auth.substring(7);
    authService.signout(token);
    return res.status(200).json({ message: 'Signed out.' });
  }
};
