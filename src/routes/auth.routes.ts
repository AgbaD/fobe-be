import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = Router();
const authController = new AuthController()

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile', authController.getAllProfiles);

export default router;
