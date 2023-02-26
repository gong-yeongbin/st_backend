import { MigrationInterface, QueryRunner } from 'typeorm';

export class logPrev10bill1677408846689 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE log_prev10bill (
            id int not null auto_increment,
            c_time datetime not null,
            code varchar(10) not null,
            c_price int not null,
            c_prev_com int not null,
            c_updown_rate int not null,
            c_accum_volume int not null,
            c_accum_trans_price int not null,
            c_volume int not null,
            c_sprice int not null,
            c_hprice int not null,
            c_lprice int not null,
            c_prev_com_sym int not null,
            c_prev_trans_com_cnt int not null,
            c_price_sell int not null,
            c_price_buy int not null,
            c_trans_price_inc int not null,
            c_prev_trans_com_rat int not null,
            c_trans_rot int not null,
            c_trans_price int not null,
            c_power int not null,
            c_market_price int not null,
            b_price int not null,
            createdAt datetime not null default current_timestamp,
            primary key(id)
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
