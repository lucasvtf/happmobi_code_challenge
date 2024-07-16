import { NextFunction, Request, Response } from 'express';
import UserService from '../services/UserService';
import IUser from '../interfaces/IUser';

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
    const user: IUser = this.req.body;
    try {
      const newUser = await this.service.create(user);
      return this.res.status(201).json(newUser);
    } catch (error) {
      this.next(error);
    }
  }

  public async update() {
    const { id } = this.req.params;
    const user: IUser = this.req.body;
    try {
      const userUpdate = await this.service.update(id, user);
      return this.res.status(200).json(userUpdate);
    } catch (error) {
      this.next(error);
    }
  }

  public async delete() {
    const { id } = this.req.params;
    const userDelete = await this.service.delete(id);
    return this.res.status(200).json(userDelete);
  }

  public async login() {
    const user = this.req.body;
    const token = await this.service.login(user);
    return this.res.status(201).json({ token });
  }
}
