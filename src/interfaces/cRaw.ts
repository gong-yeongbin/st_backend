export interface IcRaw {
  c_time: string;
  code: string;
  c_price: number;
  c_prev_com: number;
  c_updown_rate: number;
  c_accum_volume: number;
  c_accum_trans_price: number;
  c_volume: number;
  c_sprice: number;
  c_hprice: number;
  c_lprice: number;
  c_prev_com_sym: number;
  c_prev_trans_com_cnt: number;
  c_price_sell: number;
  c_price_buy: number;
  c_trans_price_inc: number;
  c_prev_trans_com_rat: number;
  c_trans_rot: number;
  c_trans_price: number;
  c_power: number;
  c_market_price: number;
  b_price?: number;
}
