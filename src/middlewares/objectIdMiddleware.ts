import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Types } from 'mongoose';

export const objectIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, vehicleId } = req.params;

  if (userId && !Types.ObjectId.isValid(userId)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ error: 'Invalid userId.' });
  }

  if (vehicleId && !Types.ObjectId.isValid(vehicleId)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ error: 'Invalid vehicleId.' });
  }

  next();
};
