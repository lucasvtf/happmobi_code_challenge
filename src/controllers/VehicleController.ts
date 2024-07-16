import { NextFunction, Request, Response } from 'express';
import VehicleService from '../services/VehicleService';
import IVehicle from '../interfaces/IVehicle';

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

  public async createVehicle() {
    const vehicle: IVehicle = this.req.body;
    try {
      const newVehicle = await this.service.createVehicle(vehicle);
      return this.res.status(201).json(newVehicle);
    } catch (error) {
      this.next(error);
    }
  }

  public async updateVehicle() {
    const { id } = this.req.params;
    const vehicle: IVehicle = this.req.body;
    try {
      const vechileUpdate = await this.service.updateVehicle(id, vehicle);
      return this.res.status(200).json(vechileUpdate);
    } catch (error) {
      this.next(error);
    }
  }

  public async deleteVehicle() {
    const { id } = this.req.params;
    const vehicleDelete = await this.service.deleteVehicle(id);
    return this.res.status(200).json(vehicleDelete);
  }

  public async getAllVehicles() {
    const vechicles = await this.service.getAllVehicles();
    return this.res.status(200).json({ vechicles });
  }
}
