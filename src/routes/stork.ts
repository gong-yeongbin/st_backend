import { Router } from 'express';
import storkController from '../controllers/stork';

const router: Router = Router();

router.get(
  '/transactionAmountOfThePreviousDayMoreThan100BillionWon',
  storkController.transactionAmountOfThePreviousDayMoreThan100BillionWon
);

router.get(
  '/moreThan15percentComparedToThePreviousDay',
  storkController.moreThan15percentComparedToThePreviousDay
);

router.get(
  '/aNetPurchaseOfThePreviousDayMoreThan10BillionWon',
  storkController.aNetPurchaseOfThePreviousDayMoreThan10BillionWon
);

router.get(
  '/checkedMoreThanFiveBillion',
  storkController.checkedMoreThanFiveBillion
);

export default router;
