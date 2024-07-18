import ApiErrors from '../utils/apiErros';
import IVehicle from '../interfaces/IVehicle';
import VehicleModel from '../models/VehicleModel';
import { StatusCodes } from 'http-status-codes';

export default class VehicleService {
  private model: VehicleModel;

  constructor() {
    this.model = new VehicleModel();
  }

  async create(vehicle: IVehicle): Promise<IVehicle> {
    const licensePlateExists = await this.model.findOne({
      vehicleLicensePlate: vehicle.vehicleLicensePlate,
    });
    if (licensePlateExists)
      throw new ApiErrors(
        'License plate already registered.',
        StatusCodes.FORBIDDEN
      );

    return this.model.create(vehicle);
  }

  public async getById(vehicleId: string): Promise<IVehicle> {
    const vehicle = await this.model.findById(vehicleId);
    if (!vehicle)
      throw new ApiErrors('Vehicle not found.', StatusCodes.NOT_FOUND);

    return vehicle;
  }

  async update(vehicleId: string, vehicleUpdate: IVehicle): Promise<IVehicle> {
    const vehicle = await this.getById(vehicleId);
    if (!vehicle)
      throw new ApiErrors('Vehicle not found.', StatusCodes.NOT_FOUND);
    await this.model.update(vehicleId, vehicleUpdate);
    return this.getById(vehicleId);
  }

  async delete(vehicleId: string): Promise<void> {
    const vehicle = await this.getById(vehicleId);
    if (!vehicle)
      throw new ApiErrors('Vehicle not found.', StatusCodes.NOT_FOUND);

    return this.model.delete(vehicleId);
  }

  async getAllVehicles(): Promise<IVehicle[]> {
    return this.model.findAll();
  }
}
