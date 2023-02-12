import mongoose from 'mongoose';
import config from '../configs';

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI);

    mongoose.set('autoCreate', true);
    mongoose.set('strictQuery', true);

    console.log(
      `
        ###############################################
                Mongodb Connection...         
        ###############################################
      `
    );
  } catch (error: any) {
    // eslint-disable-next-line
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
