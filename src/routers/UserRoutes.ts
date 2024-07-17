import { Router } from 'express';
import UserController from '../controllers/UserController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { objectIdMiddleware } from '../middlewares/objectIdMiddleware';

const userRoutes = Router();

userRoutes.post('/user', (req, res, next) =>
  new UserController(req, res, next).create()
);

userRoutes.put(
  '/user/:userId',
  authMiddleware,
  objectIdMiddleware,
  (req, res, next) => new UserController(req, res, next).update()
);

userRoutes.delete(
  '/user/:userId',
  authMiddleware,
  objectIdMiddleware,
  (req, res, next) => new UserController(req, res, next).delete()
);

userRoutes.post('/user/login', (req, res, next) =>
  new UserController(req, res, next).login()
);

userRoutes.get(
  '/user/:userId/vehicles',
  authMiddleware,
  objectIdMiddleware,
  (req, res, next) => new UserController(req, res, next).reservationHistory()
);

export default userRoutes;
