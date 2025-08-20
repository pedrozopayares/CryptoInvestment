import type { Request, Response } from 'express';
import { userService } from '../services/userService';

export const userController = {
  async getCurrentUser(req: Request, res: Response) {
    // El middleware de validación de token debe haber puesto el usuario en req.user
    const user = (req as any).user;
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const userData = await userService.getUser(user.id);
    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json(userData);
  }
};
