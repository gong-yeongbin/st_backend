import { MigrationInterface, QueryRunner } from 'typeorm';

export class deleteColumn1678519480614 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE log_prev100bill DROP c_accum_volume`);
    await queryRunner.query(`ALTER TABLE log_prev100bill DROP c_prev_com_sym`);
    await queryRunner.query(`ALTER TABLE log_prev100bill DROP c_prev_trans_com_cnt`);
    await queryRunner.query(`ALTER TABLE log_prev100bill DROP c_price_sell`);
    await queryRunner.query(`ALTER TABLE log_prev100bill DROP c_price_buy`);
    await queryRunner.query(`ALTER TABLE log_prev100bill DROP c_trans_price_inc`);
    await queryRunner.query(`ALTER TABLE log_prev100bill DROP c_prev_trans_com_rat`);
    await queryRunner.query(`ALTER TABLE log_prev100bill DROP c_trans_rot`);
    await queryRunner.query(`ALTER TABLE log_prev100bill DROP c_trans_price`);
    await queryRunner.query(`ALTER TABLE log_prev100bill DROP c_market_price`);
    await queryRunner.query(`ALTER TABLE log_prev10bill DROP c_accum_volume`);
    await queryRunner.query(`ALTER TABLE log_prev10bill DROP c_prev_com_sym`);
    await queryRunner.query(`ALTER TABLE log_prev10bill DROP c_prev_trans_com_cnt`);
    await queryRunner.query(`ALTER TABLE log_prev10bill DROP c_price_sell`);
    await queryRunner.query(`ALTER TABLE log_prev10bill DROP c_price_buy`);
    await queryRunner.query(`ALTER TABLE log_prev10bill DROP c_trans_price_inc`);
    await queryRunner.query(`ALTER TABLE log_prev10bill DROP c_prev_trans_com_rat`);
    await queryRunner.query(`ALTER TABLE log_prev10bill DROP c_trans_rot`);
    await queryRunner.query(`ALTER TABLE log_prev10bill DROP c_trans_price`);
    await queryRunner.query(`ALTER TABLE log_prev10bill DROP c_market_price`);
    await queryRunner.query(`ALTER TABLE log_5bill DROP c_accum_volume`);
    await queryRunner.query(`ALTER TABLE log_5bill DROP c_prev_com_sym`);
    await queryRunner.query(`ALTER TABLE log_5bill DROP c_prev_trans_com_cnt`);
    await queryRunner.query(`ALTER TABLE log_5bill DROP c_price_sell`);
    await queryRunner.query(`ALTER TABLE log_5bill DROP c_price_buy`);
    await queryRunner.query(`ALTER TABLE log_5bill DROP c_trans_price_inc`);
    await queryRunner.query(`ALTER TABLE log_5bill DROP c_prev_trans_com_rat`);
    await queryRunner.query(`ALTER TABLE log_5bill DROP c_trans_rot`);
    await queryRunner.query(`ALTER TABLE log_5bill DROP c_trans_price`);
    await queryRunner.query(`ALTER TABLE log_5bill DROP c_market_price`);
    await queryRunner.query(`ALTER TABLE log_15per DROP c_accum_volume`);
    await queryRunner.query(`ALTER TABLE log_15per DROP c_prev_com_sym`);
    await queryRunner.query(`ALTER TABLE log_15per DROP c_prev_trans_com_cnt`);
    await queryRunner.query(`ALTER TABLE log_15per DROP c_price_sell`);
    await queryRunner.query(`ALTER TABLE log_15per DROP c_price_buy`);
    await queryRunner.query(`ALTER TABLE log_15per DROP c_trans_price_inc`);
    await queryRunner.query(`ALTER TABLE log_15per DROP c_prev_trans_com_rat`);
    await queryRunner.query(`ALTER TABLE log_15per DROP c_trans_rot`);
    await queryRunner.query(`ALTER TABLE log_15per DROP c_trans_price`);
    await queryRunner.query(`ALTER TABLE log_15per DROP c_market_price`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
