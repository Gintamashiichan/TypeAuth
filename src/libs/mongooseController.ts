import * as mongoose from 'mongoose';

async function connectMongoose(
  host: string,
  userName: string,
  password: string,
  dbName: string,
  srv: boolean,
  port?: number,
): Promise<typeof mongoose> {
  return srv // srv is true if you are using MongoDB Atlas
    ? await mongoose.connect(
        `mongodb+srv://${userName}:${password}@${host}/?retryWrites=true&w=majority`, // MongoDB Atlas connection string
        {
          dbName: dbName,
        },
      )
    : await mongoose.connect(
        `mongodb://${userName}:${password}@${host}:${port}/`, // MongoDB connection string
        {
          dbName: dbName,
        },
      );
}

export { connectMongoose };
