import { errorResponses } from '../errors/errorResponses';
import {
  reserveVehicleResponseSchema,
  unbookVehicleResponseSchema,
} from '../schemas/reservation';

export const reservationPaths = {
  '/reserve/book/{userId}/{vehicleId}': {
    put: {
      summary: 'Reserve a vehicle',
      description: 'Reserve a vehicle for a user.',
      tags: ['Reservations'],
      parameters: [
        {
          name: 'userId',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
        },
        {
          name: 'vehicleId',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Successfully booked',
          content: {
            'application/json': {
              schema: reserveVehicleResponseSchema,
            },
          },
        },
        403: errorResponses.ForbiddenError,
        404: errorResponses.NotFoundError,
      },
    },
  },
  '/reserve/unbook/{vehicleId}': {
    put: {
      summary: 'Cancel vehicle reservation',
      description: 'Cancel the reservation of a vehicle.',
      tags: ['Reservations'],
      parameters: [
        {
          name: 'vehicleId',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Successfully unbooked',
          content: {
            'application/json': {
              schema: unbookVehicleResponseSchema,
            },
          },
        },
        404: errorResponses.NotFoundError,
      },
    },
  },
};
