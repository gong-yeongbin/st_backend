import { Column, Entity } from 'typeorm';
import { common } from './common';

@Entity({ database: 'gongyb', name: 'log_prev10bill' })
export class log_prev10bill extends common {
  @Column({ type: 'timestamp' })
  c_time: Date;

  @Column({ name: 'code', type: 'varchar' })
  code: string;

  @Column({ name: 'c_price', type: 'int' })
  c_price: number;

  @Column({ name: 'c_prev_com', type: 'int' })
  c_prev_com: number;

  @Column({ name: 'c_updown_rate', type: 'int' })
  c_updown_rate: number;

  @Column({ name: 'c_accum_volume', type: 'int' })
  c_accum_volume: number;

  @Column({ name: 'c_accum_trans_price', type: 'int' })
  c_accum_trans_price: number;

  @Column({ name: 'c_volume', type: 'int' })
  c_volume: number;

  @Column({ name: 'c_sprice', type: 'int' })
  c_sprice: number;

  @Column({ name: 'c_hprice', type: 'int' })
  c_hprice: number;

  @Column({ name: 'c_lprice', type: 'int' })
  c_lprice: number;

  @Column({ name: 'c_prev_com_sym', type: 'int' })
  c_prev_com_sym: number;

  @Column({ name: 'c_prev_trans_com_cnt', type: 'int' })
  c_prev_trans_com_cnt: number;

  @Column({ name: 'c_price_sell', type: 'int' })
  c_price_sell: number;

  @Column({ name: 'c_price_buy', type: 'int' })
  c_price_buy: number;

  @Column({ name: 'c_trans_price_inc', type: 'int' })
  c_trans_price_inc: number;

  @Column({ name: 'c_prev_trans_com_rat', type: 'int' })
  c_prev_trans_com_rat: number;

  @Column({ name: 'c_trans_rot', type: 'int' })
  c_trans_rot: number;

  @Column({ name: 'c_trans_price', type: 'int' })
  c_trans_price: number;

  @Column({ name: 'c_power', type: 'int' })
  c_power: number;

  @Column({ name: 'c_market_price', type: 'int' })
  c_market_price: number;

  @Column({ name: 'b_price', type: 'int' })
  b_price: number;
}
