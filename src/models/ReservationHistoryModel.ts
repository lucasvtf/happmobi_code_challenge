import { Schema } from 'mongoose';
import ModelExample from './Abstract';
import IReservationHistory from '../interfaces/IReservationHistory';

export default class ReservationHistoryModel extends ModelExample<IReservationHistory> {
  constructor() {
    const schema = new Schema<IReservationHistory>({
      userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      vehicleId: {
        type: Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true,
      },
      reservationDate: { type: Date, required: true, default: Date.now },
    });
    const modelName = 'reservationHistory';
    super(schema, modelName);
  }
}
