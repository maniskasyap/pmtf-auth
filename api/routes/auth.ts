import express from 'express';

import { register, login, logout, getUser } from '../controllers';
import { verifyToken } from '../middlewares';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/user', verifyToken, getUser)
router.get('/logout', logout);

export default router;
