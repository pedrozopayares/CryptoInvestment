
import { Router } from 'express';
import { userController } from '../controllers/userController';
import { tokenValidation } from '../middleware/tokenValidation';

const router = Router();

router.get('/user', tokenValidation, userController.getCurrentUser);

export default router;
