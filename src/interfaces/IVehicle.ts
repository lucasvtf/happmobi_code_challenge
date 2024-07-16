export default interface IVehicle {
  id?: string;
  vehicleModel: string;
  vehicleLicensePlate: string;
  reserved: boolean;
  reservedBy: string | null;
}
