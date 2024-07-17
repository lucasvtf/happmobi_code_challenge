import { Types } from 'mongoose';

export default interface IReservationHistory {
  id?: string;
  userId: Types.ObjectId;
  vehicleId: Types.ObjectId;
  reservationDate: Date;
}
