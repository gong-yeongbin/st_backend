import moment from 'moment-timezone';
import schedule from 'node-schedule';
import TelegramBot from 'node-telegram-bot-api';
import cRaw from './models/cRaw';
import { checkedMoreThanFiveBillion } from './interfaces/cRaw';

const date = new Date();
const offset = date.getTimezoneOffset() * 60000;
const dateOffset = new Date(date.getTime() - offset);

// 전일 거래대금 1000억 이상
async function transactionAmountOfThePreviousDayMoreThan100BillionWon() {
  // 거래대금? 매수, 매도 금액 전체?, 체결 데이터 누적거래 대금?
}

// 전일대비 15%이상 (전일1000 -> 1500)
async function moreThan15percentComparedToThePreviousDay() {
  // 직전 1분 마지막 체결가
}

// 전일 순매수 100억이상 (매수 - 매도)
async function netPurchaseOfThePreviousDayMoreThan10BillionWon() {
  //
}

// 스펙주 제외
async function excludeNameSpec() {
  //
}

// 현재가 1000원 이상
async function theCurrentPriceIsOver1000Won() {
  // 직전 1분 마지막 체결가
}

async function checkedMoreThanFiveBillion(): Promise<
  checkedMoreThanFiveBillion[]
> {
  const startMinute = moment(dateOffset)
    .tz('Asia/Seoul')
    .subtract(1, 'minute')
    .startOf('minute')
    .toISOString();
  const endMinute = moment(dateOffset)
    .tz('Asia/Seoul')
    .startOf('minute')
    .toISOString();

  return await cRaw.aggregate([
    {
      $match: {
        c_time: {
          $gte: new Date(startMinute),
          $lt: new Date(endMinute),
        },
      },
    },
    {
      $project: {
        _id: 0,
        c_time: 1,
        code: 1,
        c_price: 1,
        c_volume: 1,
        price: { $multiply: ['$c_price', '$c_volume'] },
      },
    },
    {
      $match: {
        price: { $gte: 5000000000 },
      },
    },
    {
      $sort: { c_time: 1 },
    },
  ]);
}

async function sendTelegramMessages(messages: string) {
  const token: string = process.env.TELEGRAM_TOKEN!;
  const chat_id: string = process.env.TELEGRAM_CHATID!;
  const bot: TelegramBot = new TelegramBot(token);

  await bot.sendMessage(chat_id, `50억↑\n${messages}`);
}

function createingTelegramMessages(data: checkedMoreThanFiveBillion[]): string {
  const arrayMessage: string[] = data.map((value) => {
    return `${value.c_time.toDateString()}|${value.code}|${value.c_price}|${
      value.c_volume
    }| ${value.price.toLocaleString('ko-KR')} \n`;
  });

  return arrayMessage.join('');
}

export default function main() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  schedule.scheduleJob('0 */1 8-20 * * 1-6 ', async () => {
    const checkedMoreThanFiveBillionData: checkedMoreThanFiveBillion[] =
      await checkedMoreThanFiveBillion();

    if (!checkedMoreThanFiveBillionData.length) return;

    void sendTelegramMessages(
      createingTelegramMessages(checkedMoreThanFiveBillionData)
    );
  });
}
