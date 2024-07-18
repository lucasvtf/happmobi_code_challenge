import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export const createVehicleMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { vehicleModel, vehicleLicensePlate } = req.body;

  if (vehicleModel && vehicleModel.length <= 5) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ error: 'Invalid vehicle model.' });
  }

  if (vehicleLicensePlate && vehicleLicensePlate.length <= 5) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ error: 'Invalid vehicle license plate.' });
  }

  next();
};
