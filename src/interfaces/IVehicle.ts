import { Schema } from 'mongoose';
import IUser from './IUser';

export default interface IVehicle {
  id?: string;
  vehicleModel: string;
  vehicleLicensePlate: string;
  reserved: boolean;
  reservedBy: Schema.Types.ObjectId | IUser;
}
