import moment from 'moment-timezone';
import TelegramBot from 'node-telegram-bot-api';
import c_raw from './schema/c_raw';

const now = moment
  .tz('Asia/Seoul')
  .startOf('minute')
  .format('YYYY-MM-DD hh:mm:ss');
const beforeOneMinute = moment
  .tz('Asia/Seoul')
  .subtract(1, 'minute')
  .startOf('minute')
  .format('YYYY-MM-DD hh:mm:ss');

const token: string = process.env.TELEGRAM_TOKEN!;
const chat_id: string = process.env.TELEGRAM_CHATID!;

const bot: TelegramBot = new TelegramBot(token, { polling: true });

async function findByCtime() {
  await c_raw.aggregate([
    {
      $match: {
        c_time: {
          $gte: moment(beforeOneMinute).toISOString(true),
          $lt: moment(now).toISOString(true),
        },
      },
    },
    {
      $group: {
        _id: '$code',
      },
    },
  ]);
}
export default async (): Promise<void> => {
  const date = new Date();
  const offset = date.getTimezoneOffset() * 60000;
  const dateOffset = new Date(date.getTime() - offset);
  const startD = moment(dateOffset)
    .tz('Asia/Seoul')
    .subtract(1, 'minute')
    .startOf('minute')
    .toISOString();
  const endD = moment(dateOffset)
    .tz('Asia/Seoul')
    .startOf('minute')
    .toISOString();

  const test: any = await c_raw.aggregate([
    {
      $match: {
        c_time: {
          $gte: new Date('2023-01-18T10:00:00.000Z'),
          $lt: new Date('2023-01-18T15:30:00.000Z'),
        },
      },
    },
    {
      $group: {
        _id: '$code',
        total: { $sum: { $multiply: ['$c_price', '$c_volume'] } },
      },
    },
    {
      $sort: { total: -1 },
    },
  ]);
  console.log(test);
  console.log(test.length);
  //   await bot.sendMessage(chat_id, 'test message');
};
