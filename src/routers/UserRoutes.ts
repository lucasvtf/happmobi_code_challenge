import { Router } from 'express';
import UserController from '../controllers/UserController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { objectIdMiddleware } from '../middlewares/objectIdMiddleware';
import { createUserMiddleware } from '../middlewares/createUserMiddleware';
import { loginMiddleware } from '../middlewares/loginMiddlware';

const userRoutes = Router();

userRoutes.post('/user', createUserMiddleware, (req, res, next) =>
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

userRoutes.post('/user/login', loginMiddleware, (req, res, next) =>
  new UserController(req, res, next).login()
);

userRoutes.get(
  '/user/:userId/vehicles',
  authMiddleware,
  objectIdMiddleware,
  (req, res, next) => new UserController(req, res, next).reservationHistory()
);

export default userRoutes;
