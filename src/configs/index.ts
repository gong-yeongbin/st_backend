import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  port: parseInt(process.env.PORT as string),
  mongoURI: process.env.MONGO_URI as string,
  // token: process.env.TELEGRAM_TOKEN,
  // chatId: process.env.TELEGRAM_CHATID,
};
