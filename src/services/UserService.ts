import bcrypt from 'bcrypt';
import IUser from '../interfaces/IUser';
import UserModel from '../models/UserModel';
import ApiErrors from '../utils/apiErros';
import { createToken } from '../utils/jwt';

export default class UserService {
  private model: UserModel;

  constructor() {
    this.model = new UserModel();
  }

  public async create(user: IUser) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    const newUser = this.model.create(user);
    return newUser;
  }

  public async getById(userId: string) {
    const user = this.model.findById(userId);
    if (!user) throw new ApiErrors('Invalid mongo id', 422);
    return user;
  }

  public async update(userId: string, userUpdate: IUser) {
    const user = await this.getById(userId);
    if (!user) throw new ApiErrors('User not found.', 404);
    return this.model.update(userId, userUpdate);
  }

  public async delete(userId: string) {
    return this.model.delete(userId);
  }

  public async login(user: IUser) {
    const userLogin = await this.model.findByEmail(user.email);
    if (!userLogin) throw new ApiErrors('Wrong email or password.', 403);
    const validPassword = await bcrypt.compare(
      user.password,
      userLogin.password
    );

    if (!validPassword) throw new ApiErrors('Wrong email or password.', 403);

    const token = createToken({ email: userLogin.email });
    return token;
  }
}
