import mongoose from 'mongoose';
import config from '../configs';

export default (async function () {
  try {
    await mongoose.connect(config.mongoURI);

    mongoose.set('autoCreate', true);
    mongoose.set('strictQuery', true);

    console.log(
      `
        #########################################################
                Mongodb Connection...         
        #########################################################
      `
    );
  } catch (error: any) {
    console.error(error.message);
    process.exit(1);
  }
})();
