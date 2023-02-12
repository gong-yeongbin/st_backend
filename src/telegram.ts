import schedule from 'node-schedule';
import TelegramBot from 'node-telegram-bot-api';
import {
  fnaNetPurchaseOfThePreviousDayMoreThan10BillionWon,
  fnCheckedMoreThanFiveBillion,
} from './util/stork';

async function sendTelegramMessages(
  title: string,
  messages: string
): Promise<void> {
  const token: string = process.env.TELEGRAM_TOKEN!;
  const chat_id: string = process.env.TELEGRAM_CHATID!;
  const bot: TelegramBot = new TelegramBot(token);

  await bot.sendMessage(chat_id, `${title}\n${messages}`);
}

function fnCreateingTelegramMessages(
  data: { code: string; price: number }[]
): string {
  if (!data.length) return '';

  let arrayMessage: Array<string>;
  arrayMessage = [''];

  arrayMessage = data.map((value) => {
    return `${value.code}|${value.price.toLocaleString('ko-KR')}|\n`;
  });

  return arrayMessage.join('');
}
export default function main() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  schedule.scheduleJob('0 */1 8-18 * * 1-7 ', async () => {
    await sendTelegramMessages(
      '50억 이상',
      fnCreateingTelegramMessages(await fnCheckedMoreThanFiveBillion())
    );
    await sendTelegramMessages(
      '전일 순매수 100억 이상',
      fnCreateingTelegramMessages(
        await fnaNetPurchaseOfThePreviousDayMoreThan10BillionWon()
      )
    );
    // await fnaNetPurchaseOfThePreviousDayMoreThan10BillionWon();
    // if (!checkedMoreThanFiveBillionData.length) return;
    // void sendTelegramMessages(
    //   createingTelegramMessages(checkedMoreThanFiveBillionData)
    // );
  });
}
