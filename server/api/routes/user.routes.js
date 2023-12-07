import express from 'express';
import { profile } from '../controllers/user.controller.js'
import { checkAuthentication } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/profile', checkAuthentication, profile);
export default router;