import mongoose from 'mongoose';
import { env } from './env.js';

export const connectDatabase = async (): Promise<typeof mongoose> => {
  try {
    if (mongoose.connection.readyState === 1) {
      return mongoose;
    }

    mongoose.set('strictQuery', true);

    try {
      // Try connecting to URI
      const conn = await mongoose.connect(env.MONGODB_URI, { serverSelectionTimeoutMS: 2000 });
      console.log(`[MongoDB Connected]: ${conn.connection.host} / ${conn.connection.name}`);
      return conn;
    } catch (e) {
      // Fallback to MongoMemoryServer for zero-dependency local execution
      console.log('[MongoDB Notice]: Direct connection timed out. Bootstrapping MongoMemoryServer...');
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      const uri = mongod.getUri();
      const conn = await mongoose.connect(uri);
      console.log(`[MongoMemoryServer Connected]: ${uri}`);
      return conn;
    }
  } catch (error) {
    console.error(`[MongoDB Connection Error]:`, error);
    return mongoose;
  }
};
