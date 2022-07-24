import express from 'express';
import team from './auth';

const router = express.Router();

router.use('/', team);

export default router;
