import mongoose from 'mongoose';
import 'dotenv/config';

const connectToDatabase = (mongoDatabaseURI = process.env.MONGO_URI) =>
  mongoose.connect(mongoDatabaseURI);

export default connectToDatabase;
