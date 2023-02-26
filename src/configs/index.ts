import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'local';

const envFound = dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  port: parseInt(process.env.PORT as string),
  mongoURI: process.env.MONGO_URI as string,
  mysql_port: parseInt(process.env.MYSQL_PORT as string),
  mysql_host: process.env.MYSQL_HOST as string,
  mysql_username: process.env.MYSQL_USERNAME as string,
  mysql_password: process.env.MYSQL_PASSWORD as string,
  mysql_database: process.env.MYSQL_DATABASE as string,
  redis_port: parseInt(process.env.REDIS_PORT as string),
  redis_host: process.env.REDIS_HOST as string,
  // token: process.env.TELEGRAM_TOKEN,
  // chatId: process.env.TELEGRAM_CHATID,
};
