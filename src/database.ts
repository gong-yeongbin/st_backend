import * as Mongoose from 'mongoose';

let database: Mongoose.Connection;

export const connectDB = async (): Promise<void> => {
  const uri: string = process.env.MONGO_URI!;

  if (database) return;

  Mongoose.set('strictQuery', false);
  await Mongoose.connect(uri);

  console.log(
    `
        ###############################################
                Mongodb Connection...         
        ###############################################
    `
  );
};
