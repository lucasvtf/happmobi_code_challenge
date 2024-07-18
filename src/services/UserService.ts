import bcrypt from 'bcrypt';
import IUser from '../interfaces/IUser';
import UserModel from '../models/UserModel';
import ApiErrors from '../utils/apiErros';
import { createToken } from '../utils/jwt';
import ReservationHistoryModel from '../models/ReservationHistoryModel';
import { StatusCodes } from 'http-status-codes';
import IReservationHistory from 'src/interfaces/IReservationHistory';

export default class UserService {
  private userModel: UserModel;
  private reservationHistoryModel: ReservationHistoryModel;

  constructor() {
    this.userModel = new UserModel();
    this.reservationHistoryModel = new ReservationHistoryModel();
  }

  public async create(user: IUser): Promise<Partial<IUser>> {
    const emailExists = await this.userModel.findByEmail(user.email);
    if (emailExists)
      throw new ApiErrors('Email already registered.', StatusCodes.FORBIDDEN);
    const hashedPassword = await bcrypt.hash(user.password, 10);

    user.password = hashedPassword;
    const newUser = await this.userModel.create(user);

    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };
  }

  public async getById(userId: string): Promise<Partial<IUser>> {
    const user = await this.userModel.findById(userId);
    if (!user) throw new ApiErrors('User not found.', StatusCodes.NOT_FOUND);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  public async update(
    userId: string,
    userUpdate: IUser
  ): Promise<Partial<IUser>> {
    const user = await this.getById(userId);
    if (!user) throw new ApiErrors('User not found.', StatusCodes.NOT_FOUND);

    await this.userModel.update(userId, userUpdate);

    const userUpdated = await this.userModel.findById(userId);

    return {
      id: userUpdated.id,
      name: userUpdated.name,
      email: userUpdated.email,
    };
  }

  public async delete(userId: string): Promise<void> {
    const user = await this.getById(userId);
    if (!user) throw new ApiErrors('User not found.', StatusCodes.NOT_FOUND);

    return this.userModel.delete(userId);
  }

  public async login(user: IUser): Promise<string> {
    const userLogin = await this.userModel.findByEmail(user.email);
    if (!userLogin) throw new ApiErrors('Wrong email.', StatusCodes.FORBIDDEN);

    const validPassword = await bcrypt.compare(
      user.password,
      userLogin.password
    );

    if (!validPassword)
      throw new ApiErrors('Wrong password.', StatusCodes.FORBIDDEN);

    const token = createToken({ email: userLogin.email });
    return token;
  }

  public async getReservationHistory(
    userId: string
  ): Promise<IReservationHistory[]> {
    const reservationHistory = await this.reservationHistoryModel.find({
      userId,
    });

    if (reservationHistory.length === 0) {
      throw new ApiErrors(
        'No reservation history found for this user.',
        StatusCodes.NOT_FOUND
      );
    }

    return reservationHistory;
  }
}
