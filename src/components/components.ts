import express from 'express';
const router = express.Router();

import memberComponent from './Admin';

router.use('/admin', memberComponent);

export default router;
