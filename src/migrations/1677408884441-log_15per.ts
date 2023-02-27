import { MigrationInterface, QueryRunner } from 'typeorm';

export class log15per1677408884441 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE log_15per (
            id bigint not null auto_increment,
            c_time datetime not null,
            code varchar(10) not null,
            c_price bigint not null,
            c_prev_com bigint not null,
            c_updown_rate bigint not null,
            c_accum_volume bigint not null,
            c_accum_trans_price bigint not null,
            c_volume bigint not null,
            c_sprice bigint not null,
            c_hprice bigint not null,
            c_lprice bigint not null,
            c_prev_com_sym bigint not null,
            c_prev_trans_com_cnt bigint not null,
            c_price_sell bigint not null,
            c_price_buy bigint not null,
            c_trans_price_inc bigint not null,
            c_prev_trans_com_rat float not null,
            c_trans_rot float not null,
            c_trans_price bigint not null,
            c_power float not null,
            c_market_price bigint not null,
            createdAt datetime not null default current_timestamp,
            primary key(id)
          )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
