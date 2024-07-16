import { Router } from 'express';
import UserController from '../controllers/UserController';
import { authMiddleware } from '../middlewares/authMiddleware';

const userRoutes = Router();

userRoutes.post('/user', (req, res, next) =>
  new UserController(req, res, next).create()
);

userRoutes.put('/user/:id', authMiddleware, (req, res, next) =>
  new UserController(req, res, next).update()
);

userRoutes.delete('/user/:id', authMiddleware, (req, res, next) =>
  new UserController(req, res, next).delete()
);

userRoutes.post('/user/login', (req, res, next) =>
  new UserController(req, res, next).login()
);

export default userRoutes;
