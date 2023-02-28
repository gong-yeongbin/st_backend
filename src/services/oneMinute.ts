import { log_5bill } from '../entities/log_5bill';
import { log_15per } from '../entities/log_15per';
import { Between, Repository } from 'typeorm';
import appDataSource from '../loaders/mysql';
import { endDate, startDate } from '../util/date';

const log5billRepository: Repository<log_5bill> = appDataSource.getRepository(log_5bill);
const log15perRepository: Repository<log_15per> = appDataSource.getRepository(log_15per);

const oneMinute = {
  // 50억 이상 채결
  checkedMoreThanFiveBillion: async (): Promise<log_5bill[]> => {
    return await log5billRepository.find({
      where: { createdAt: Between(new Date(startDate()), new Date(endDate())) },
    });
  },

  // 전일대비 15%이상
  moreThan15percentComparedToThePreviousDay: async (): Promise<log_15per[]> => {
    return await log15perRepository.find({
      where: { createdAt: Between(new Date(startDate()), new Date(endDate())) },
    });
  },
};

export default oneMinute;
