import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  port: parseInt(process.env.PORT as string),
  mongoURI: process.env.MONGO_URI as string,
  mysql_port: parseInt(process.env.DB_PORT as string),
  mysql_host: process.env.DB_HOST as string,
  mysql_username: process.env.DB_USERNAME as string,
  mysql_password: process.env.DB_PASSWORD as string,
  mysql_database: process.env.DB_DATABASE as string,
  // token: process.env.TELEGRAM_TOKEN,
  // chatId: process.env.TELEGRAM_CHATID,
};
