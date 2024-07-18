import { NextFunction, Request, Response } from 'express';
import VehicleService from '../services/VehicleService';
import IVehicle from '../interfaces/IVehicle';
import { StatusCodes } from 'http-status-codes';

export default class VehicleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: VehicleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new VehicleService();
  }

  public async create() {
    const vehicle: IVehicle = this.req.body;
    try {
      const newVehicle = await this.service.create(vehicle);
      return this.res.status(StatusCodes.CREATED).json(newVehicle);
    } catch (error) {
      this.next(error);
    }
  }

  public async update() {
    const { vehicleId } = this.req.params;
    const vehicle: IVehicle = this.req.body;
    try {
      const vechileUpdate = await this.service.update(vehicleId, vehicle);
      return this.res.status(StatusCodes.OK).json(vechileUpdate);
    } catch (error) {
      this.next(error);
    }
  }

  public async delete() {
    try {
      const { vehicleId } = this.req.params;
      await this.service.delete(vehicleId);
      return this.res.status(StatusCodes.NO_CONTENT);
    } catch (error) {
      this.next(error);
    }
  }

  public async getAllVehicles() {
    const vechicles = await this.service.getAllVehicles();
    return this.res.status(200).json({ vechicles });
  }
}
