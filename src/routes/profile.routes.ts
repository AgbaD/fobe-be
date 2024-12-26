import { Router } from 'express';
import { ProfileController } from '../controllers/profile.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
const profileController = new ProfileController()

router.get('/all', authMiddleware, profileController.getAllProfiles);
router.get('/', authMiddleware, profileController.getProfile);

export default router;
