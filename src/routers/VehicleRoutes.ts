import { Router } from 'express';
import VehicleController from '../controllers/VehicleController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { objectIdMiddleware } from '../middlewares/objectIdMiddleware';

const vehicleRoutes = Router();

vehicleRoutes.post('/vehicle', authMiddleware, (req, res, next) =>
  new VehicleController(req, res, next).createVehicle()
);

vehicleRoutes.put(
  '/vehicle/:vehicleId',
  authMiddleware,
  objectIdMiddleware,
  (req, res, next) => new VehicleController(req, res, next).updateVehicle()
);

vehicleRoutes.delete(
  '/vehicle/:vehicleId',
  authMiddleware,
  objectIdMiddleware,
  (req, res, next) => new VehicleController(req, res, next).deleteVehicle()
);

vehicleRoutes.get('/vehicle', authMiddleware, (req, res, next) =>
  new VehicleController(req, res, next).getAllVehicles()
);

export default vehicleRoutes;
