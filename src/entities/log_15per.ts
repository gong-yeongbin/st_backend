import { Column, Entity } from 'typeorm';
import { common } from './common';

@Entity({ database: 'gongyb', name: 'log_15per' })
export class log_15per extends common {
  @Column({ type: 'varchar' })
  c_time: string;

  @Column({ name: 'code', type: 'varchar' })
  code: string;

  @Column({ name: 'c_price', type: 'bigint' })
  c_price: number;

  @Column({ name: 'c_prev_com', type: 'bigint' })
  c_prev_com: number;

  @Column({ name: 'c_updown_rate', type: 'bigint' })
  c_updown_rate: number;

  @Column({ name: 'c_accum_volume', type: 'bigint' })
  c_accum_volume: number;

  @Column({ name: 'c_accum_trans_price', type: 'bigint' })
  c_accum_trans_price: number;

  @Column({ name: 'c_volume', type: 'bigint' })
  c_volume: number;

  @Column({ name: 'c_sprice', type: 'bigint' })
  c_sprice: number;

  @Column({ name: 'c_hprice', type: 'bigint' })
  c_hprice: number;

  @Column({ name: 'c_lprice', type: 'bigint' })
  c_lprice: number;

  @Column({ name: 'c_prev_com_sym', type: 'bigint' })
  c_prev_com_sym: number;

  @Column({ name: 'c_prev_trans_com_cnt', type: 'bigint' })
  c_prev_trans_com_cnt: number;

  @Column({ name: 'c_price_sell', type: 'bigint' })
  c_price_sell: number;

  @Column({ name: 'c_price_buy', type: 'bigint' })
  c_price_buy: number;

  @Column({ name: 'c_trans_price_inc', type: 'bigint' })
  c_trans_price_inc: number;

  @Column({ name: 'c_prev_trans_com_rat', type: 'float' })
  c_prev_trans_com_rat: number;

  @Column({ name: 'c_trans_rot', type: 'float' })
  c_trans_rot: number;

  @Column({ name: 'c_trans_price', type: 'bigint' })
  c_trans_price: number;

  @Column({ name: 'c_power', type: 'float' })
  c_power: number;

  @Column({ name: 'c_market_price', type: 'bigint' })
  c_market_price: number;
}
