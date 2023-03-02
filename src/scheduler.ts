import schedule from 'node-schedule';
import storkService from './services/stork';
import appDataSource from './loaders/mysql';
import { IcRaw } from './interfaces/cRaw';
import { log_5bill } from './entities/log_5bill';
import { log_15per } from './entities/log_15per';
import { log_prev10bill } from './entities/log_prev10bill';
import { log_prev100bill } from './entities/log_prev100bill';
import { Repository } from 'typeorm';
import crawling from './crawling';

export default (function main() {
  const logPrev100billRepository: Repository<log_prev100bill> = appDataSource.getRepository(log_prev100bill);
  const logPrev10billRepository: Repository<log_prev10bill> = appDataSource.getRepository(log_prev10bill);
  const log5billRepository: Repository<log_5bill> = appDataSource.getRepository(log_5bill);
  const log15perRepository: Repository<log_15per> = appDataSource.getRepository(log_15per);

  schedule.scheduleJob('0 36 16 * * 1-7 ', async () => {
    crawling();
  });

  schedule.scheduleJob('0 0 1 * * 1-7 ', async () => {
    // 전일 거래대금 1000억 이상
    const prev100bill: IcRaw[] = await storkService.transactionAmountOfThePreviousDayMoreThan100BillionWon();

    if (prev100bill.length > 0) {
      console.log('prev100bill : ', prev100bill.length);
      await logPrev100billRepository.save(prev100bill);
    }

    // 전일 순매수 100억이상 (매수 - 매도)
    const prev10bill: IcRaw[] = await storkService.aNetPurchaseOfThePreviousDayMoreThan10BillionWon();

    if (prev10bill.length > 0) {
      console.log('prev10bill : ', prev10bill.length);
      await logPrev10billRepository.save(prev10bill);
    }
  });

  // 9시~18시 1분마다
  schedule.scheduleJob('0 */1 9-18 * * 1-7 ', async () => {
    // 50억 이상 채결
    const log5bill: IcRaw[] = await storkService.checkedMoreThanFiveBillion();

    if (log5bill.length > 0) {
      console.log(`log5bill : ${log5bill.length}`);
      await log5billRepository.save(log5bill);
    }

    // 전일대비 15%이상
    const log15per: IcRaw[] = await storkService.moreThan15percentComparedToThePreviousDay();

    if (log15per.length > 0) {
      console.log('log15per : ', log15per.length);
      await log15perRepository.save(log15per);
    }
  });
})();
