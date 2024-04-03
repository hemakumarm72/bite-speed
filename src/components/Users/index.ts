import express from 'express';

import authComponent from './auth';
import profileComponent from './profile';
import memberComponent from './member';
import tiktikComponent from './tiktok/';

import { isAuthSuperAdmin, isAuthenticated } from '../../utils/auth';
const router = express.Router();

router.use('/auth', authComponent);
router.use('/tiktok', tiktikComponent);
router.use('/profile', isAuthenticated, profileComponent);
router.use('/member', isAuthSuperAdmin, memberComponent);

export default router;
