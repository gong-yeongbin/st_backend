import { Request, Response } from 'express';
import storkService from '../services/stork';

const storkController = {
  transactionAmountOfThePreviousDayMoreThan100BillionWon: async (
    req: Request,
    res: Response
  ) => {
    await storkService.transactionAmountOfThePreviousDayMoreThan100BillionWon();
  },
  moreThan15percentComparedToThePreviousDay: async (
    req: Request,
    res: Response
  ) => {
    await storkService.moreThan15percentComparedToThePreviousDay();
  },
  aNetPurchaseOfThePreviousDayMoreThan10BillionWon: async (
    req: Request,
    res: Response
  ) => {
    await storkService.aNetPurchaseOfThePreviousDayMoreThan10BillionWon();
  },
  checkedMoreThanFiveBillion: async (req: Request, res: Response) => {
    await storkService.checkedMoreThanFiveBillion();
  },
};

export default storkController;
