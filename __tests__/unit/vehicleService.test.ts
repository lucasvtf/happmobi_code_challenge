import VehicleService from '../../src/services/VehicleService';
import VehicleModel from '../../src/models/VehicleModel';
import ApiErrors from '../../src/utils/apiErros';
import { StatusCodes } from 'http-status-codes';
import IVehicle from '../../src/interfaces/IVehicle';

jest.mock('../../src/models/VehicleModel', () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
      findOne: jest.fn(),
      create: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
      findReservedBy: jest.fn(),
    })),
  };
});

describe('VehicleService', () => {
  let service: VehicleService;
  let model: jest.Mocked<VehicleModel>;

  beforeEach(() => {
    model = new VehicleModel() as jest.Mocked<VehicleModel>;
    service = new VehicleService();
    (service as any).model = model;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a vehicle successfully', async () => {
      const vehicle: IVehicle = {
        vehicleModel: 'moto',
        vehicleLicensePlate: 'FMV0703',
        reserved: false,
        reservedBy: null,
      };
      model.findOne.mockResolvedValue(null);
      model.create.mockResolvedValue(vehicle);

      const result = await service.create(vehicle);
      expect(result).toEqual(vehicle);
      expect(model.findOne).toHaveBeenCalledWith({
        vehicleLicensePlate: vehicle.vehicleLicensePlate,
      });
      expect(model.create).toHaveBeenCalledWith(vehicle);
    });

    it('should throw an error if license plate already exists', async () => {
      const vehicle: IVehicle = {
        vehicleModel: 'moto',
        vehicleLicensePlate: 'FMV0703',
        reserved: false,
        reservedBy: null,
      };
      model.findOne.mockResolvedValue(vehicle);

      await expect(service.create(vehicle)).rejects.toThrow(
        new ApiErrors(
          'License plate already registered.',
          StatusCodes.FORBIDDEN
        )
      );
      expect(model.findOne).toHaveBeenCalledWith({
        vehicleLicensePlate: vehicle.vehicleLicensePlate,
      });
      expect(model.create).not.toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('should return a vehicle if found', async () => {
      const vehicle: IVehicle = {
        vehicleModel: 'moto',
        vehicleLicensePlate: 'FMV0703',
        reserved: false,
        reservedBy: null,
      };
      model.findById.mockResolvedValue(vehicle);

      const result = await service.getById('1');
      expect(result).toEqual(vehicle);
      expect(model.findById).toHaveBeenCalledWith('1');
    });

    it('should throw an error if vehicle is not found', async () => {
      model.findById.mockResolvedValue(null);

      await expect(service.getById('1')).rejects.toThrow(
        new ApiErrors('Vehicle not found.', StatusCodes.NOT_FOUND)
      );
      expect(model.findById).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should update a vehicle successfully', async () => {
      const vehicle: IVehicle = {
        vehicleModel: 'moto',
        vehicleLicensePlate: 'FMV0703',
        reserved: false,
        reservedBy: null,
      };
      const updatedVehicle: IVehicle = {
        vehicleModel: 'car',
        vehicleLicensePlate: 'FMV0703',
        reserved: false,
        reservedBy: null,
      };

      model.findById
        .mockResolvedValueOnce(vehicle)
        .mockResolvedValueOnce(updatedVehicle);
      model.update.mockResolvedValue(Promise.resolve());

      const result = await service.update('1', updatedVehicle);
      expect(result).toEqual(updatedVehicle);
      expect(model.update).toHaveBeenCalledWith('1', updatedVehicle);
      expect(model.findById).toHaveBeenCalledTimes(2);
    });

    it('should throw an error if vehicle is not found for update', async () => {
      const vehicle: IVehicle = {
        vehicleModel: 'moto',
        vehicleLicensePlate: 'FMV0703',
        reserved: false,
        reservedBy: null,
      };
      model.findById.mockResolvedValue(null);

      await expect(service.update('1', vehicle)).rejects.toThrow(
        new ApiErrors('Vehicle not found.', StatusCodes.NOT_FOUND)
      );
      expect(model.findById).toHaveBeenCalledWith('1');
      expect(model.update).not.toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should delete a vehicle successfully', async () => {
      const vehicle: IVehicle = {
        vehicleModel: 'moto',
        vehicleLicensePlate: 'FMV0703',
        reserved: false,
        reservedBy: null,
      };
      model.findById.mockResolvedValue(vehicle);
      model.delete.mockResolvedValue();

      await service.delete('1');
      expect(model.delete).toHaveBeenCalledWith('1');
    });

    it('should throw an error if vehicle is not found for delete', async () => {
      model.findById.mockResolvedValue(null);

      await expect(service.delete('1')).rejects.toThrow(
        new ApiErrors('Vehicle not found.', StatusCodes.NOT_FOUND)
      );
      expect(model.findById).toHaveBeenCalledWith('1');
      expect(model.delete).not.toHaveBeenCalled();
    });
  });

  describe('getAllVehicles', () => {
    it('should return all vehicles', async () => {
      const vehicles: IVehicle[] = [
        {
          vehicleModel: 'moto',
          vehicleLicensePlate: 'FMV0703',
          reserved: false,
          reservedBy: null,
        },
      ];
      model.findAll.mockResolvedValue(vehicles);

      const result = await service.getAllVehicles();
      expect(result).toEqual(vehicles);
      expect(model.findAll).toHaveBeenCalled();
    });
  });
});
