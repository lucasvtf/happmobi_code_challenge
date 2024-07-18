import { NextFunction, Request, Response } from 'express';
import ReservationService from '../services/ReservationService';
import { StatusCodes } from 'http-status-codes';

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
    try {
      const { userId, vehicleId } = this.req.params;
      await this.service.reserveVehicle(userId, vehicleId);
      return this.res
        .status(StatusCodes.OK)
        .json({ message: 'Successfully booked.' });
    } catch (error) {
      this.next(error);
    }
  }

  async cleanReservation() {
    try {
      const { vehicleId } = this.req.params;
      await this.service.cleanReservation(vehicleId);
      return this.res
        .status(StatusCodes.OK)
        .json({ message: 'Successfully unbooked.' });
    } catch (error) {
      this.next(error);
    }
  }
}
