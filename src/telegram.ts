import TelegramBot from 'node-telegram-bot-api';

const token: string = process.env.TELEGRAM_TOKEN!;
const chat_id: string = process.env.TELEGRAM_CHATID!;

const bot: TelegramBot = new TelegramBot(token, { polling: true });

export default async () => {
  await bot.sendMessage(chat_id, 'test message');
};
