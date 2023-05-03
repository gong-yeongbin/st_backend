import 'reflect-metadata';

import express, { Express } from 'express';
import cors from 'cors';
import config from './config';
import indexRouter from './routes/index';

import 'dotenv/config';
import './loaders/mongodb';
import './schedules';

const app: Express = express();
app.use('/', indexRouter);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app
  .listen(config.port, () => {
    console.log(
      `
        #########################################################
                Server listening on port : ${config.port}        
        #########################################################    
      `
    );
  })
  .on('error', (err) => {
    console.error(err);
    process.exit(1);
  });
