import * as mongoose from 'mongoose';

async function connectMongoose(
  host: string,
  userName: string,
  password: string,
  dbName: string,
  srv: boolean,
  port?: number,
): Promise<typeof mongoose> {
  return srv
    ? await mongoose.connect(
        `mongodb+srv://${userName}:${password}@${host}/?retryWrites=true&w=majority`,
        {
          dbName: dbName,
        },
      )
    : await mongoose.connect(
        `mongodb://${userName}:${password}@${host}:${port}/`,
        {
          dbName: dbName,
        },
      );
}

export { connectMongoose };
