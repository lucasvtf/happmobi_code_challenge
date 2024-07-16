import { Schema } from 'mongoose';
import IUser from '../interfaces/IUser';
import ModelExample from './Abstract';

export default class UserModel extends ModelExample<IUser> {
  constructor() {
    const schema = new Schema<IUser>({
      name: { type: String, required: true },
      password: { type: String, required: true },
      email: { type: String, required: true, unique: true },
    });
    const modelName = 'users';
    super(schema, modelName);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return this.model.findOne({ email });
  }
}
