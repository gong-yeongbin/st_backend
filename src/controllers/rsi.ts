import { Request, Response } from 'express';
import rsiService from '../services/rsi';

const rsiController = {
  minute: async (req: Request, res: Response) => {
    rsiService.minute();
    res.status(201).send('GET: /rsi/minute');
  },
  day: async (req: Request, res: Response) => {
    res.status(201).send('GET: /rsi/day');
  },
};

export default rsiController;
