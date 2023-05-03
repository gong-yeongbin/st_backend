import { Router } from 'express';
import rsiController from '../controllers/rsi';

const router: Router = Router();

router.get('/minute', rsiController.minute);
router.get('/day', rsiController.day);

export default router;
