export const vehicleSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', description: 'Vehicle ID' },
    vehicleModel: { type: 'string', description: 'Model of the vehicle' },
    vehicleLicensePlate: {
      type: 'string',
      description: 'License plate of the vehicle',
    },
    reserved: {
      type: 'boolean',
      description: 'Reservation status of the vehicle',
    },
    reservedBy: {
      type: 'string',
      nullable: true,
      description: 'ID of the user who reserved the vehicle',
    },
  },
  required: ['vehicleModel', 'vehicleLicensePlate'],
};

export const createVehicleSchema = {
  type: 'object',
  properties: {
    vehicleModel: { type: 'string', description: 'Model of the vehicle' },
    vehicleLicensePlate: {
      type: 'string',
      description: 'License plate of the vehicle',
    },
  },
  required: ['vehicleModel', 'vehicleLicensePlate'],
};

export const updateVehicleSchema = {
  type: 'object',
  properties: {
    vehicleModel: { type: 'string', description: 'Model of the vehicle' },
    vehicleLicensePlate: {
      type: 'string',
      description: 'License plate of the vehicle',
    },
  },
};
