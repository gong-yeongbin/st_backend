import { Router } from 'express';
import storkRouter from './stork';

const router: Router = Router();

router.use('/st', storkRouter);

export default router;
