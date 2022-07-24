import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { createFailure } from '../../utils/api-response';
import config from '../../config';

declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}

export const verifyToken = (req: Request, res: Response, next: any) => {
  const authHeader = req.headers['authorization'] as string;

  if (!authHeader) {
    const errNoToken = createFailure(
      undefined,
      'A token is required for authentication'
    );
    return res.status(403).send(errNoToken);
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, config.jwt.tokenKey);
    req['user'] = decoded;
  } catch (err) {
    const errInvalid = createFailure(undefined, 'Invalid Token');
    return res.status(401).send(errInvalid);
  }
  return next();
};
