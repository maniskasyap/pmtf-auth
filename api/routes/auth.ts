import express from 'express';

import {
  register,
  login,
  logout,
  getUser,
  updatePassword,
} from '../controllers';
import { verifyToken } from '../middlewares';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/user', verifyToken, getUser);
router.post('/updatePassword', updatePassword);
router.get('/logout', logout);

export default router;
