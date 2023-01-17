import TelegramBot from 'node-telegram-bot-api';
import c_raw from './schema/c_raw';

const token: string = process.env.TELEGRAM_TOKEN!;
const chat_id: string = process.env.TELEGRAM_CHATID!;

const bot: TelegramBot = new TelegramBot(token, { polling: true });

export default async () => {
  console.log(await c_raw.find());
  //   await bot.sendMessage(chat_id, 'test message');
};
