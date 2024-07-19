import UserService from '../../src/services/UserService';
import UserModel from '../../src/models/UserModel';
import IUser from '../../src/interfaces/IUser';
import bcrypt from 'bcrypt';
import { createToken } from '../../src/utils/jwt';

jest.mock('../../src/utils/jwt');
jest.mock('../../src/models/UserModel');
jest.mock('bcrypt');

describe('UserService', () => {
  let userService: UserService;
  let userModelMock: jest.Mocked<UserModel>;

  beforeEach(() => {
    userService = new UserService();
    userModelMock = userService['userModel'] as jest.Mocked<UserModel>;
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const user: IUser = {
        name: 'teste teste',
        email: 'test@example.com',
        password: '123456',
      };

      const hashedPassword = 'hashed_password_mock';
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

      const createdUser = {
        ...user,
        id: 'mocked_id',
        password: hashedPassword,
      };
      userModelMock.create.mockResolvedValue(createdUser);

      const result = await userService.create(user);

      expect(result).toEqual({
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
      });
    });
  });

  describe('getById', () => {
    it('should return the user if found', async () => {
      const userId = 'some_id';
      const user: IUser = {
        id: userId,
        name: 'John Doe',
        email: 'test@example.com',
        password: 'hashed_password',
      };

      userModelMock.findById.mockResolvedValue(user);

      const result = await userService.getById(userId);

      expect(userModelMock.findById).toHaveBeenCalledWith(userId);
      expect(result).toEqual({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    });

    it('should throw an error if the user is not found', async () => {
      const userId = 'invalid_id';

      userModelMock.findById.mockResolvedValue(null);

      await expect(userService.getById(userId)).rejects.toThrow(
        'User not found.'
      );
    });
  });

  describe('update', () => {
    it('should update the user if found', async () => {
      const userId = 'some_id';
      const userUpdate: IUser = {
        id: userId,
        name: 'New Name',
        email: 'new@example.com',
        password: 'newpassword',
      };
      const user: IUser = {
        id: userId,
        name: 'Old Name',
        email: 'test@example.com',
        password: 'oldpassword',
      };
      const updatedUser = {
        id: userId,
        name: 'New Name',
        email: 'new@example.com',
        password: 'newpassword',
      };

      userModelMock.findById
        .mockResolvedValueOnce(user) // First call to findById returns the old user
        .mockResolvedValueOnce(updatedUser); // Second call to findById returns the updated user

      userModelMock.update.mockResolvedValueOnce(Promise.resolve());

      const result = await userService.update(userId, userUpdate);

      expect(userModelMock.findById).toHaveBeenCalledWith(userId);
      expect(userModelMock.update).toHaveBeenCalledWith(userId, userUpdate);
      expect(result).toEqual({
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
      });
    });

    it('should throw an error if the user is not found', async () => {
      const userId = 'invalid_id';
      const userUpdate: IUser = {
        id: userId,
        name: 'New Name',
        email: 'new@example.com',
        password: 'newpassword',
      };

      userModelMock.findById.mockResolvedValue(null);

      await expect(userService.update(userId, userUpdate)).rejects.toThrow(
        'User not found.'
      );
    });
  });

  describe('delete', () => {
    it('should delete the user', async () => {
      const userId = 'some_id';

      userModelMock.findById.mockResolvedValue({
        id: userId,
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password',
      });
      userModelMock.delete.mockResolvedValue(Promise.resolve());

      await userService.delete(userId);

      expect(userModelMock.findById).toHaveBeenCalledWith(userId);
      expect(userModelMock.delete).toHaveBeenCalledWith(userId);
    });

    it('should throw an error if the user is not found', async () => {
      const userId = 'invalid_id';

      userModelMock.findById.mockResolvedValue(null);

      await expect(userService.delete(userId)).rejects.toThrow(
        'User not found.'
      );
    });
  });

  describe('login', () => {
    it('should return a token if login is successful', async () => {
      const user: Partial<IUser> = {
        email: 'test@example.com',
        password: 'password',
      };
      const userFromDB: IUser = {
        id: 'some_id',
        name: 'John Doe',
        email: 'test@example.com',
        password: 'hashed_password',
      };
      const token = 'token';

      userModelMock.findByEmail.mockResolvedValue(userFromDB);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (createToken as jest.Mock).mockReturnValue(token);

      const result = await userService.login(user as IUser);

      expect(userModelMock.findByEmail).toHaveBeenCalledWith(user.email);
      expect(bcrypt.compare).toHaveBeenCalledWith(
        user.password,
        userFromDB.password
      );
      expect(createToken).toHaveBeenCalledWith({ email: userFromDB.email });
      expect(result).toBe(token);
    });

    it('should throw an error if email is wrong', async () => {
      const user: Partial<IUser> = {
        email: 'test@example.com',
        password: 'password',
      };

      userModelMock.findByEmail.mockResolvedValue(null);

      await expect(userService.login(user as IUser)).rejects.toThrow(
        'Wrong email.'
      );
    });

    it('should throw an error if password is wrong', async () => {
      const user: Partial<IUser> = {
        email: 'test@example.com',
        password: 'password',
      };
      const userFromDB: IUser = {
        id: 'some_id',
        name: 'John Doe',
        email: 'test@example.com',
        password: 'hashed_password',
      };

      userModelMock.findByEmail.mockResolvedValue(userFromDB);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(userService.login(user as IUser)).rejects.toThrow(
        'Wrong password.'
      );
    });
  });
});
