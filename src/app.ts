import express, { Express } from 'express';
import 'dotenv/config';
import { connectDB } from './database';

const port = process.env.PORT || 3000;

const app: Express = express();

void connectDB();

app.listen(port, () => {
  console.log(
    `
        ###############################################
                Server listening on port : ${port}        
        ###############################################
    `
  );
});
