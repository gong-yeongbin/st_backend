import { Router } from 'express';
import rsiRouter from './rsi';

const router: Router = Router();

router.use('/rsi', rsiRouter);

export default router;
