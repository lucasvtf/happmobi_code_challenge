import { NextFunction, Request, Response } from 'express';
import UserService from '../services/UserService';
import IUser from '../interfaces/IUser';
import { StatusCodes } from 'http-status-codes';

export default class UserController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: UserService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new UserService();
  }

  public async create() {
    try {
      const user: IUser = this.req.body;
      const newUser = await this.service.create(user);
      return this.res.status(StatusCodes.CREATED).json(newUser);
    } catch (error) {
      this.next(error);
    }
  }

  public async update() {
    try {
      const { userId } = this.req.params;
      const user: IUser = this.req.body;
      const userUpdate = await this.service.update(userId, user);
      return this.res.status(StatusCodes.OK).json(userUpdate);
    } catch (error) {
      this.next(error);
    }
  }

  public async delete() {
    try {
      const { userId } = this.req.params;
      await this.service.delete(userId);
      return this.res.status(StatusCodes.NO_CONTENT);
    } catch (error) {
      this.next(error);
    }
  }

  public async login() {
    try {
      const user = this.req.body;
      const token = await this.service.login(user);
      return this.res.status(StatusCodes.ACCEPTED).json({ token });
    } catch (error) {
      this.next(error);
    }
  }

  public async reservationHistory() {
    try {
      const { userId } = this.req.params;
      const reservationHistory = await this.service.getReservationHistory(
        userId
      );
      return this.res.status(StatusCodes.OK).json({ reservationHistory });
    } catch (error) {
      this.next(error);
    }
  }
}
