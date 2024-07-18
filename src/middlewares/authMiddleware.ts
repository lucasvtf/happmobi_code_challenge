import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { StatusCodes } from 'http-status-codes';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('Authorization');
  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send({ error: 'Access denied. No token provided.' });
  }

  try {
    verifyToken(token);
    next();
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).send({ error: 'Invalid token.' });
  }
};
