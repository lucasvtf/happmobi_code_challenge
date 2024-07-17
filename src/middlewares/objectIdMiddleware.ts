import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';

export const objectIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, vehicleId } = req.params;

  try {
    if (userId && !Types.ObjectId.isValid(userId)) {
      return res.status(400).send({ error: 'Invalid id.' });
    }

    if (vehicleId && !Types.ObjectId.isValid(vehicleId)) {
      return res.status(400).send({ error: 'Invalid id.' });
    }

    next();
  } catch (err) {
    res.status(400).send({ error: 'Invalid id.' });
  }
};
