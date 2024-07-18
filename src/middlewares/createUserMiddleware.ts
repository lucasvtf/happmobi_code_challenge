import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export const createUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, password, email } = req.body;

  if (name && name.length <= 5) {
    return res.status(StatusCodes.BAD_REQUEST).send({ error: 'Invalid name.' });
  }

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
