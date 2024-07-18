import { Router } from 'express';
import VehicleController from '../controllers/VehicleController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { objectIdMiddleware } from '../middlewares/objectIdMiddleware';
import { createVehicleMiddleware } from '../middlewares/createVehicleMiddleware';

const vehicleRoutes = Router();

vehicleRoutes.post(
  '/vehicle',
  authMiddleware,
  createVehicleMiddleware,
  (req, res, next) => new VehicleController(req, res, next).create()
);

vehicleRoutes.put(
  '/vehicle/:vehicleId',
  authMiddleware,
  objectIdMiddleware,
  createVehicleMiddleware,
  (req, res, next) => new VehicleController(req, res, next).update()
);

vehicleRoutes.delete(
  '/vehicle/:vehicleId',
  authMiddleware,
  objectIdMiddleware,
  (req, res, next) => new VehicleController(req, res, next).delete()
);

vehicleRoutes.get('/vehicle', authMiddleware, (req, res, next) =>
  new VehicleController(req, res, next).getAllVehicles()
);

export default vehicleRoutes;
