import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export const loginMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password, email } = req.body;

  if (email && email.length <= 5) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ error: 'Invalid email.' });
  }

  if (password && password.length <= 3) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ error: 'Invalid password.' });
  }

  next();
};
