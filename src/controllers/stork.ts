import { Request, Response } from 'express';
import { IcRaw } from '../interfaces/cRaw';
import storkService from '../services/stork';

const storkController = {
  transactionAmountOfThePreviousDayMoreThan100BillionWon: async (
    req: Request,
    res: Response
  ) => {
    try {
      const transactionAmountOfThePreviousDayMoreThan100BillionWonData: IcRaw[] =
        await storkService.transactionAmountOfThePreviousDayMoreThan100BillionWon();

      return res.json(
        transactionAmountOfThePreviousDayMoreThan100BillionWonData
      );
    } catch (error) {
      console.log(error);
    }
  },

  moreThan15percentComparedToThePreviousDay: async (
    req: Request,
    res: Response
  ) => {
    try {
      const moreThan15percentComparedToThePreviousDayData: IcRaw[] =
        await storkService.moreThan15percentComparedToThePreviousDay();

      return res.json(moreThan15percentComparedToThePreviousDayData);
    } catch (error) {
      console.log(error);
    }
  },

  aNetPurchaseOfThePreviousDayMoreThan10BillionWon: async (
    req: Request,
    res: Response
  ) => {
    try {
      const aNetPurchaseOfThePreviousDayMoreThan10BillionWonData: IcRaw[] =
        await storkService.aNetPurchaseOfThePreviousDayMoreThan10BillionWon();

      return res.json(aNetPurchaseOfThePreviousDayMoreThan10BillionWonData);
    } catch (error) {
      console.log(error);
    }
  },

  checkedMoreThanFiveBillion: async (req: Request, res: Response) => {
    try {
      const checkedMoreThanFiveBillionData: IcRaw[] =
        await storkService.checkedMoreThanFiveBillion();

      return res.json(checkedMoreThanFiveBillionData);
    } catch (error) {
      console.log(error);
    }
  },
};

export default storkController;
