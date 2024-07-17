import { Router } from 'express';
import ReservationController from '../controllers/ReservationController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { objectIdMiddleware } from '../middlewares/objectIdMiddleware';

const reservationRoutes = Router();

reservationRoutes.put(
  '/reserve/book/:userId/:vehicleId',
  authMiddleware,
  objectIdMiddleware,
  (req, res, next) => new ReservationController(req, res, next).reserveVehicle()
);

reservationRoutes.put(
  '/reserve/unbook/:vehicleId',
  authMiddleware,
  objectIdMiddleware,
  (req, res, next) =>
    new ReservationController(req, res, next).cleanReservation()
);

export default reservationRoutes;
