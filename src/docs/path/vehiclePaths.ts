import {
  vehicleSchema,
  createVehicleSchema,
  updateVehicleSchema,
} from '../schemas/vehicle';
import { errorResponses } from '../errors/errorResponses';

export const vehiclePaths = {
  '/vehicle': {
    post: {
      summary: 'Create a new vehicle',
      description: 'Create a new vehicle with necessary details.',
      tags: ['Vehicles'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: createVehicleSchema,
          },
        },
      },
      responses: {
        201: {
          description: 'Vehicle created successfully',
          content: {
            'application/json': {
              schema: vehicleSchema,
            },
          },
        },
        403: errorResponses.ForbiddenError,
        400: errorResponses.BadRequestError,
      },
    },
    get: {
      summary: 'Get all vehicles',
      description: 'Retrieve a list of all vehicles.',
      tags: ['Vehicles'],
      responses: {
        200: {
          description: 'List of vehicles retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: vehicleSchema,
              },
            },
          },
        },
        403: errorResponses.ForbiddenError,
        400: errorResponses.BadRequestError,
      },
    },
  },
  '/vehicle/{vehicleId}': {
    put: {
      summary: 'Update vehicle details',
      description: 'Update the details of an existing vehicle.',
      tags: ['Vehicles'],
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
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: updateVehicleSchema,
          },
        },
      },
      responses: {
        200: {
          description: 'Vehicle updated successfully',
          content: {
            'application/json': {
              schema: vehicleSchema,
            },
          },
        },
        404: errorResponses.NotFoundError,
        400: errorResponses.BadRequestError,
      },
    },
    delete: {
      summary: 'Delete a vehicle',
      description: 'Delete a vehicle by ID.',
      tags: ['Vehicles'],
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
        204: {
          description: 'Vehicle deleted successfully',
        },
        404: errorResponses.NotFoundError,
      },
    },
  },
};
