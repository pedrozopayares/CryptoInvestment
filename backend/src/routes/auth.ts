
import { Router } from 'express';
import { authController } from '../controllers/authController';
import { registerController } from '../controllers/registerController';
import { userController } from '../controllers/userController';
import { tokenValidation } from '../middleware/tokenValidation';

const router = Router();



router.post('/register', registerController.register);
router.post('/signin', authController.signin);
router.post('/signout', authController.signout);
router.get('/user', tokenValidation, userController.getCurrentUser);

export default router;
