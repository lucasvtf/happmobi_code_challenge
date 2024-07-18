import VehicleModel from '../models/VehicleModel';
import UserModel from '../models/UserModel';
import ReservationHistoryModel from '../models/ReservationHistoryModel';
import ApiErrors from '../utils/apiErros';
import { Types } from 'mongoose';

export default class ReservationService {
  private vehicleModel: VehicleModel;
  private userModel: UserModel;
  private reservationHistoryModel: ReservationHistoryModel;

  constructor() {
    this.vehicleModel = new VehicleModel();
    this.userModel = new UserModel();
    this.reservationHistoryModel = new ReservationHistoryModel();
  }

  async reserveVehicle(userId: string, vehicleId: string): Promise<void> {
    const vehicleExists = await this.vehicleModel.findById(vehicleId);
    if (!vehicleExists) throw new ApiErrors('Vehicle not found', 404);

    const userExists = await this.userModel.findById(userId);
    if (!userExists) throw new ApiErrors('User not found', 404);

    const isReserved = vehicleExists.reserved;
    if (isReserved) throw new ApiErrors('Vehicle already reserved.', 403);

    const userReservations = await this.vehicleModel.findReservedBy(userId);

    if (userReservations.length > 0)
      throw new ApiErrors('User already had a reservation.', 403);

    await this.reservationHistoryModel.create({
      userId: new Types.ObjectId(userId),
      vehicleId: new Types.ObjectId(vehicleId),
      reservationDate: new Date(),
    });

    return this.vehicleModel.update(vehicleId, {
      reserved: true,
      reservedBy: userId,
    });
  }

  async cleanReservation(vehicleId: string): Promise<void> {
    const vehicleExists = await this.vehicleModel.findById(vehicleId);
    if (!vehicleExists) throw new ApiErrors('Vehicle not found', 404);

    return this.vehicleModel.update(vehicleId, {
      reserved: false,
      reservedBy: null,
    });
  }
}
