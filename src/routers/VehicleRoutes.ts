import { Router } from 'express';
import VehicleController from '../controllers/VehicleController';
import { authMiddleware } from '../middlewares/authMiddleware';

const vehicleRoutes = Router();

vehicleRoutes.post('/vehicle', authMiddleware, (req, res, next) =>
  new VehicleController(req, res, next).createVehicle()
);

vehicleRoutes.put('/vehicle/:id', authMiddleware, (req, res, next) =>
  new VehicleController(req, res, next).updateVehicle()
);

vehicleRoutes.delete('/vehicle/:id', authMiddleware, (req, res, next) =>
  new VehicleController(req, res, next).deleteVehicle()
);

vehicleRoutes.get('/vehicle', authMiddleware, (req, res, next) =>
  new VehicleController(req, res, next).getAllVehicles()
);

export default vehicleRoutes;
