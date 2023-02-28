import moment from 'moment-timezone';
import appDataSource from '../loaders/mysql';
import { Between, Repository } from 'typeorm';
import { log_prev100bill } from '../entities/log_prev100bill';
import { log_prev10bill } from '../entities/log_prev10bill';
import { endDate, startDate } from '../util/date';

const logPrev100billRepository: Repository<log_prev100bill> = appDataSource.getRepository(log_prev100bill);
const logPrev10billRepository: Repository<log_prev10bill> = appDataSource.getRepository(log_prev10bill);

const previousDay = {
  // 전일 거래대금 1000억 이상
  transactionAmountOfThePreviousDayMoreThan100BillionWon: async (): Promise<log_prev100bill[]> => {
    return await logPrev100billRepository.find({
      where: { createdAt: Between(new Date(startDate()), new Date(endDate())) },
    });
  },
  // 전일 순매수 100억이상 (매수 - 매도)
  aNetPurchaseOfThePreviousDayMoreThan10BillionWon: async (): Promise<log_prev10bill[]> => {
    return await logPrev10billRepository.find({
      where: { createdAt: Between(new Date(startDate()), new Date(endDate())) },
    });
  },
};

export default previousDay;
