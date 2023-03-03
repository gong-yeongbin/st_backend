import 'reflect-metadata';
import express, { Express } from 'express';
import cors from 'cors';
import 'dotenv/config';
import './loaders/mongodb';
import './loaders/mysql';
import './loaders/redis';
import './scheduler';
// import './crawling';
import config from './config';
import index from './routes/index';

const app: Express = express();
app.use(cors());
app.use('/', index);

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
