import dotenv from 'dotenv';

const envFound = dotenv.config();

if (envFound.error) throw new Error("⚠️  Couldn't find .env file  ⚠️");

export default {
  port: parseInt(process.env.PORT as string),
  mongoURI: process.env.MONGO_URI as string,
};
