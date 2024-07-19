import {
  userSchema,
  userSchemaResponse,
  userUpdateSchema,
  loginSchema,
  reservationHistorySchema,
} from '../schemas/user';
import { errorResponses } from '../errors/errorResponses';

const userPaths = {
  '/user': {
    post: {
      summary: 'Create a new user',
      description: 'Create a new user with name, email, and password.',
      tags: ['Users'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: userSchema,
          },
        },
      },
      responses: {
        201: {
          description: 'User created successfully',
          content: {
            'application/json': {
              schema: userSchemaResponse,
            },
          },
        },
        403: errorResponses.ForbiddenError,
        400: errorResponses.BadRequestError,
      },
    },
  },
  '/user/{userId}': {
    put: {
      summary: 'Update user details',
      description: 'Update the details of an existing user.',
      tags: ['Users'],
      parameters: [
        {
          name: 'userId',
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
            schema: userUpdateSchema,
          },
        },
      },
      responses: {
        200: {
          description: 'User updated successfully',
          content: {
            'application/json': {
              schema: userUpdateSchema,
            },
          },
        },
        404: errorResponses.NotFoundError,
        400: errorResponses.BadRequestError,
      },
    },
    delete: {
      summary: 'Delete a user',
      description: 'Delete a user by ID.',
      tags: ['Users'],
      parameters: [
        {
          name: 'userId',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        204: {
          description: 'User deleted successfully',
        },
        404: errorResponses.NotFoundError,
      },
    },
  },
  '/user/login': {
    post: {
      summary: 'Login',
      description: 'Authenticate a user and return a token.',
      tags: ['Users'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: loginSchema,
          },
        },
      },
      responses: {
        202: {
          description: 'Login successful',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  token: { type: 'string' },
                },
              },
            },
          },
        },
        403: errorResponses.ForbiddenError,
        400: errorResponses.BadRequestError,
      },
    },
  },
  '/user/{userId}/vehicles': {
    get: {
      summary: 'Get user reservation history',
      description: 'Retrieve the reservation history of a user.',
      tags: ['Users'],
      parameters: [
        {
          name: 'userId',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Reservation history retrieved successfully',
          content: {
            'application/json': {
              schema: reservationHistorySchema,
            },
          },
        },
        404: errorResponses.NotFoundError,
      },
    },
  },
};

export default userPaths;
