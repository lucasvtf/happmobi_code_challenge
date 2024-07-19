import swaggerJsdoc from 'swagger-jsdoc';
import userPaths from './path/userPaths';
import { errorResponses } from './errors/errorResponses';
import {
  userSchema,
  userUpdateSchema,
  loginSchema,
  reservationHistorySchema,
} from './schemas/user';
import {
  createVehicleSchema,
  updateVehicleSchema,
  vehicleSchema,
} from './schemas/vehicle';
import { vehiclePaths } from './path/vehiclePaths';
import {
  reserveVehicleResponseSchema,
  unbookVehicleResponseSchema,
} from './schemas/reservation';
import { reservationPaths } from './path/reservationPaths';

const options: swaggerJsdoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Vehicle Management API',
      version: '1.0.0',
      description: 'Vehicle Management API Documentation',
      contact: {
        email: 'lucassvtf@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local server',
      },
    ],
    components: {
      schemas: {
        User: userSchema,
        UserUpdate: userUpdateSchema,
        Login: loginSchema,
        ReservationHistory: reservationHistorySchema,
        Vehicle: vehicleSchema,
        CreateVehicle: createVehicleSchema,
        UpdateVehicle: updateVehicleSchema,
        ReserveVehicleResponse: reserveVehicleResponseSchema,
        UnbookVehicleResponse: unbookVehicleResponseSchema,
      },
      responses: errorResponses,
    },
    paths: {
      ...userPaths,
      ...vehiclePaths,
      ...reservationPaths,
    },
  },
  apis: ['./path/*.ts'],
};

const specs = swaggerJsdoc(options);

export default specs;
