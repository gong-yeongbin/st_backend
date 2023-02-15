import { Request, Response, Router } from 'express';

const router: Router = Router();

router.use('/', (req: Request, res: Response) => {
  console.log('Hello World...!!!');
});

router.use('/st', (req: Request, res: Response) => {
  console.log('Hello World...!!!');
});

export default router;
