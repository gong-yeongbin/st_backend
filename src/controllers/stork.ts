import { Request, Response } from 'express';
import oneMinute from '../services/oneMinute';
import previousDay from '../services/previousDay';
import { log_prev10bill } from '../entities/log_prev10bill';
import { log_prev100bill } from '../entities/log_prev100bill';
import { log_5bill } from '../entities/log_5bill';
import { log_15per } from '../entities/log_15per';
import { ImRaw } from '../interfaces/mRaw';

const storkController = {
  transactionAmountOfThePreviousDayMoreThan100BillionWon: async (req: Request, res: Response) => {
    try {
      const transactionAmountOfThePreviousDayMoreThan100BillionWonData: log_prev100bill[] =
        await previousDay.transactionAmountOfThePreviousDayMoreThan100BillionWon();
      return res.json(transactionAmountOfThePreviousDayMoreThan100BillionWonData);
    } catch (error) {
      console.log(error);
    }
  },

  aNetPurchaseOfThePreviousDayMoreThan10BillionWon: async (req: Request, res: Response) => {
    try {
      const aNetPurchaseOfThePreviousDayMoreThan10BillionWonData: log_prev10bill[] =
        await previousDay.aNetPurchaseOfThePreviousDayMoreThan10BillionWon();

      return res.json(aNetPurchaseOfThePreviousDayMoreThan10BillionWonData);
    } catch (error) {
      console.log(error);
    }
  },

  moreThan15percentComparedToThePreviousDay: async (req: Request, res: Response) => {
    try {
      const moreThan15percentComparedToThePreviousDayData: log_15per[] =
        await oneMinute.moreThan15percentComparedToThePreviousDay();

      return res.json(moreThan15percentComparedToThePreviousDayData);
    } catch (error) {
      console.log(error);
    }
  },

  checkedMoreThanFiveBillion: async (req: Request, res: Response) => {
    try {
      const checkedMoreThanFiveBillionData: log_5bill[] = await oneMinute.checkedMoreThanFiveBillion();

      return res.json(checkedMoreThanFiveBillionData);
    } catch (error) {
      console.log(error);
    }
  },

  getRsi: async (req: Request, res: Response) => {
    try {
      const mRawList: ImRaw[] = await previousDay.getRsi();

      return res.json(mRawList);
    } catch (error) {
      console.log(error);
    }
  },
};

export default storkController;
