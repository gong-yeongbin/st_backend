import { DataSource } from 'typeorm';
import configs from '../config';
console.log(__dirname);
const AppDataSource = new DataSource({
  type: 'mysql',
  host: configs.mysql_host,
  port: configs.mysql_port,
  username: configs.mysql_username,
  password: configs.mysql_password,
  database: configs.mysql_database,
  entities: [__dirname + '/../entities/*.{ts,js}'],
  migrations: [__dirname + '/../migrations/*.{ts,js}'],
  synchronize: false,
  logging: false,
});

AppDataSource.initialize()
  .then(() => {
    console.log(`
        #########################################################
                Typeorm Data Source has been initalized!
        #########################################################
    `);
  })
  .catch((err) => {
    console.error(
      `
        #########################################################
                Error during Typeorm Data Source initalizaion
        #########################################################
    `,
      err
    );
  });

export default AppDataSource;
