import schedule from 'node-schedule';
import TelegramBot from 'node-telegram-bot-api';
import { cRawReturn } from './interfaces/cRaw';
import {
  fnaNetPurchaseOfThePreviousDayMoreThan10BillionWon,
  fnCheckedMoreThanFiveBillion,
  fnmoreThan15percentComparedToThePreviousDay,
  fntransactionAmountOfThePreviousDayMoreThan100BillionWon,
} from './util/stork';

const token: string = process.env.TELEGRAM_TOKEN!;
const chat_id: string = process.env.TELEGRAM_CHATID!;
const bot: TelegramBot = new TelegramBot(token, { polling: true });

// eslint-disable-next-line @typescript-eslint/no-misused-promises
bot.on('message', async ({ text }) => {
  if (text == '메뉴') {
    await bot.sendMessage(
      chat_id,
      `1.전일 거래대금 1000억 이상\n2.전일 순매수 100억이상 (매수 - 매도)\n3.전일대비 15%이상`
    );
  }
  if (text == '1') {
    void sendTelegramMessages(
      '전일 거래대금 1000억 이상 - 금액(백만)',
      fnCreateingTelegramMessages(
        await fntransactionAmountOfThePreviousDayMoreThan100BillionWon()
      )
    );
  }
  if (text == '2') {
    void sendTelegramMessages(
      '전일 순매수 100억 이상',
      fnCreateingTelegramMessages(
        await fnaNetPurchaseOfThePreviousDayMoreThan10BillionWon()
      )
    );
  }
  if (text == '3') {
    void sendTelegramMessages(
      '전일대비 15%이상(직전 1분)',
      fnCreateingTelegramMessages(
        await fnmoreThan15percentComparedToThePreviousDay()
      )
    );
  }
  if (text == 'exit') {
    await bot.stopPolling();
  }
});

async function sendTelegramMessages(
  title: string,
  messages: string
): Promise<void> {
  await bot.sendMessage(chat_id, `${title}\n${messages}`);
}

function fnCreateingTelegramMessages(
  data: { code: string; price: number }[]
): string {
  if (!data.length) return '';

  let arrayMessage: Array<string>;
  arrayMessage = [''];

  arrayMessage = data.map((value) => {
    return `${value.code} | ${value.price.toLocaleString('ko-KR')} \n`;
  });

  return arrayMessage.join('');
}
export default function main() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call

  schedule.scheduleJob('0 */1 9-18 * * 1-7 ', async () => {
    const checkedMoreThanFiveBillionData: cRawReturn[] =
      await fnCheckedMoreThanFiveBillion();

    if (checkedMoreThanFiveBillionData.length > 0) {
      void sendTelegramMessages(
        '50억 이상',
        fnCreateingTelegramMessages(checkedMoreThanFiveBillionData)
      );
    }
  });

  // schedule.scheduleJob('0 0 9 * * 1-7 ', async () => {
  //   const netPurchaseOfThePreviousDayMoreThan10BillionWonData: cRawReturn[] =
  //     await fnaNetPurchaseOfThePreviousDayMoreThan10BillionWon();

  //   if (netPurchaseOfThePreviousDayMoreThan10BillionWonData.length > 0) {
  //     void sendTelegramMessages(
  //       '전일 순매수 100억 이상',
  //       fnCreateingTelegramMessages(
  //         netPurchaseOfThePreviousDayMoreThan10BillionWonData
  //       )
  //     );
  //   }

  //   const transactionAmountOfThePreviousDayMoreThan100BillionWonData: cRawReturn[] =
  //     await fntransactionAmountOfThePreviousDayMoreThan100BillionWon();

  //   if (transactionAmountOfThePreviousDayMoreThan100BillionWonData.length > 0) {
  //     void sendTelegramMessages(
  //       '전일 거래대금 1000억 이상 - 금액(백만)',
  //       fnCreateingTelegramMessages(
  //         transactionAmountOfThePreviousDayMoreThan100BillionWonData
  //       )
  //     );
  //   }

  //   const moreThan15percentComparedToThePreviousDayData: cRawReturn[] =
  //     await fnmoreThan15percentComparedToThePreviousDay();

  //   if (moreThan15percentComparedToThePreviousDayData.length > 0) {
  //     void sendTelegramMessages(
  //       '전일대비 15%이상',
  //       fnCreateingTelegramMessages(
  //         moreThan15percentComparedToThePreviousDayData
  //       )
  //     );
  //   }
  // });
}
