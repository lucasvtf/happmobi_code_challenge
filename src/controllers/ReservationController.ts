import { NextFunction, Request, Response } from 'express';
import ReservationService from '../services/ReservationService';

export default class Reservationcontroller {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: ReservationService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new ReservationService();
  }

  async reserveVehicle() {
    const { userId, vehicleId } = this.req.params;
    await this.service.reserveVehicle(userId, vehicleId);
    return this.res.status(200).json({ message: 'Successfully booked.' });
  }

  async cleanReservation() {
    const { vehicleId } = this.req.params;
    await this.service.cleanReservation(vehicleId);
    return this.res.status(200).json({ message: 'Successfully unbooked.' });
  }
}
