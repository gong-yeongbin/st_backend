import { Request, Response } from 'express';
import rsiService from '../services/rsi';

const rsiController = {
  minute: async (req: Request, res: Response) => {
    res.status(201).json(await rsiService.minute());
  },
  day: async (req: Request, res: Response) => {
    res.status(201).send(await rsiService.day());
  },
};

export default rsiController;
