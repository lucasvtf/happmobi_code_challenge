import ApiErrors from '../utils/apiErros';
import IVehicle from '../interfaces/IVehicle';
import VehicleModel from '../models/VehicleModel';

export default class VehicleService {
  private model: VehicleModel;

  constructor() {
    this.model = new VehicleModel();
  }

  async createVehicle(vehicle: IVehicle) {
    return this.model.create(vehicle);
  }

  public async getById(vehicleId: string) {
    const vehicle = this.model.findById(vehicleId);
    if (!vehicle) throw new ApiErrors('Invalid mongo id', 422);
    return vehicle;
  }

  async updateVehicle(vehicleId: string, vehicleUpdate: IVehicle) {
    const vehicle = await this.getById(vehicleId);
    if (!vehicle) throw new ApiErrors('Vehicle not found.', 404);
    return this.model.update(vehicleId, vehicleUpdate);
  }

  async deleteVehicle(vehicleId: string) {
    return this.model.delete(vehicleId);
  }

  async getAllVehicles() {
    return this.model.findAll();
  }
}
