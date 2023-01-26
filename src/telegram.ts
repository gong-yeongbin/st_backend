import moment from 'moment-timezone';
import schedule from 'node-schedule';
import TelegramBot from 'node-telegram-bot-api';
import c_raw from './schema/c_raw';

async function checkedMoreThanFiveBillion(): Promise<
  {
    _id: string;
    theSumOfTheMinutes: number;
  }[]
> {
  const date = new Date();
  const offset = date.getTimezoneOffset() * 60000;
  const dateOffset = new Date(date.getTime() - offset);
  const startMinute = moment(dateOffset)
    .tz('Asia/Seoul')
    .subtract(1, 'minute')
    .startOf('minute')
    .toISOString();
  const endMinute = moment(dateOffset)
    .tz('Asia/Seoul')
    .startOf('minute')
    .toISOString();

  return await c_raw.aggregate([
    {
      $match: {
        c_time: {
          $gte: new Date(startMinute),
          $lt: new Date(endMinute),
        },
      },
    },
    {
      $group: {
        _id: '$code',
        theSumOfTheMinutes: { $sum: { $multiply: ['$c_price', '$c_volume'] } },
      },
    },
    {
      $match: {
        theSumOfTheMinutes: { $gte: 100000000 },
      },
    },
    {
      $sort: { theSumOfTheMinutes: -1 },
    },
  ]);
}

async function sendTelegramMessages(messages: string) {
  const token: string = process.env.TELEGRAM_TOKEN!;
  const chat_id: string = process.env.TELEGRAM_CHATID!;
  const bot: TelegramBot = new TelegramBot(token);

  await bot.sendMessage(chat_id, `1억↑\n${messages}`);
}

function createingTelegramMessages(
  data: {
    _id: string;
    theSumOfTheMinutes: number;
  }[]
): string {
  const arrayMessage: string[] = data.map((value) => {
    return `${value._id}\t\t:\t\t${value.theSumOfTheMinutes.toLocaleString(
      'ko-KR'
    )} \n`;
  });

  return arrayMessage.join('');
}

export default function main() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  schedule.scheduleJob('0 */1 8-18 * * 1-6 ', async () => {
    const checkedMoreThanFiveBillionData: {
      _id: string;
      theSumOfTheMinutes: number;
    }[] = await checkedMoreThanFiveBillion();

    if (!checkedMoreThanFiveBillionData.length) return;

    void sendTelegramMessages(
      createingTelegramMessages(checkedMoreThanFiveBillionData)
    );
  });
}
