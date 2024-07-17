import { Schema } from 'mongoose';
import ModelExample from './Abstract';
import IVehicle from '../interfaces/IVehicle';

export default class VehicleModel extends ModelExample<IVehicle> {
  constructor() {
    const schema = new Schema<IVehicle>({
      vehicleModel: { type: String, required: true },
      vehicleLicensePlate: { type: String, required: true, unique: true },
      reserved: { type: Boolean, required: true, default: false },
      reservedBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    });
    const modelName = 'vehicles';
    super(schema, modelName);
  }

  async findReservedBy(userId: string): Promise<IVehicle[]> {
    return await this.model.find({ reservedBy: userId });
  }
}
