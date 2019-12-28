import { Router } from 'express';

import * as loginController from '../controllers/login';
import { authLocal } from '../utils/auth';

const router = Router();

/**
 * POST /api/login
 */
router.post('/', authLocal, loginController.login);

export default router;
