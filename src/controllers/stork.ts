import { Request, Response } from 'express';
import { cRawReturn } from '../interfaces/cRaw';
import storkService from '../services/stork';

const storkController = {
  transactionAmountOfThePreviousDayMoreThan100BillionWon: async (
    req: Request,
    res: Response
  ) => {
    try {
      const transactionAmountOfThePreviousDayMoreThan100BillionWonData: cRawReturn[] =
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
      const moreThan15percentComparedToThePreviousDayData: cRawReturn[] =
        await storkService.moreThan15percentComparedToThePreviousDay();

      return res.json({ data: moreThan15percentComparedToThePreviousDayData });
    } catch (error) {
      console.log(error);
    }
  },

  aNetPurchaseOfThePreviousDayMoreThan10BillionWon: async (
    req: Request,
    res: Response
  ) => {
    try {
      const aNetPurchaseOfThePreviousDayMoreThan10BillionWonData: cRawReturn[] =
        await storkService.aNetPurchaseOfThePreviousDayMoreThan10BillionWon();

      return res.json(aNetPurchaseOfThePreviousDayMoreThan10BillionWonData);
    } catch (error) {
      console.log(error);
    }
  },

  checkedMoreThanFiveBillion: async (req: Request, res: Response) => {
    try {
      const checkedMoreThanFiveBillionData: cRawReturn[] =
        await storkService.checkedMoreThanFiveBillion();

      return res.json({ data: checkedMoreThanFiveBillionData });
    } catch (error) {
      console.log(error);
    }
  },
};

export default storkController;
