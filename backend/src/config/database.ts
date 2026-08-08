import mongoose from 'mongoose';
import { env } from './env.js';

export const isDatabaseConnected = (): boolean => {
  return mongoose.connection.readyState === 1;
};

export const connectDatabase = async (): Promise<typeof mongoose> => {
  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  mongoose.set('strictQuery', true);

  try {
    const conn = await mongoose.connect(env.MONGODB_URI, { serverSelectionTimeoutMS: 3000 });
    console.log(`[MongoDB Connected]: ${conn.connection.host} / ${conn.connection.name}`);
    return conn;
  } catch (err: any) {
    // Production Rule: Never fallback to memory server in production
    if (env.NODE_ENV === 'production') {
      console.error(`[MongoDB Error]: Production database connection failed: ${err.message}`);
      throw new Error(`PRODUCTION_DATABASE_UNAVAILABLE: ${err.message}`);
    }

    // Development / Test fallback to MongoMemoryServer for local execution
    console.log('[MongoDB Notice]: Direct connection failed. Bootstrapping MongoMemoryServer for development/testing...');
    const { MongoMemoryServer } = await import('mongodb-memory-server');
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    const conn = await mongoose.connect(uri);
    console.log(`[MongoMemoryServer Connected]: ${uri}`);
    return conn;
  }
};
