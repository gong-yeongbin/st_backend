import express, { Express } from 'express';
import 'dotenv/config';
import connectDB from './loaders/db';
import telegram from './telegram';
import config from './configs';
import routers from './routes';

const app: Express = express();

void connectDB();
void telegram();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routers);

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
