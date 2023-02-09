import express, { Express } from 'express';
import 'dotenv/config';
import mongodb from './loaders/mongodb';
import telegram from './telegram';
import config from './configs';
const app: Express = express();

void mongodb();
void telegram();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app
  .listen(config.port, () => {
    console.log(
      `
        ###############################################
                Server listening on port : ${config.port}        
        ###############################################
    `
    );
  })
  .on('error', (err) => {
    console.error(err);
    process.exit(1);
  });
