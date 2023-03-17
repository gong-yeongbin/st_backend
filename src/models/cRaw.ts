import mongoose from 'mongoose';
import { IcRaw } from '../interfaces/cRaw';

const cRawSchema = new mongoose.Schema(
  {
    c_time: { type: String }, //  체결시간
    code: { type: String }, //  코드
    c_price: { type: Number }, //  체결가
    c_prev_com: { type: Number }, //  전일대비
    c_updown_rate: { type: Number }, //  등락율
    // c_accum_volume: { type: Number }, //  누적체결량
    c_accum_trans_price: { type: Number }, //  누적거래대금
    c_volume: { type: Number }, //  체결량
    c_sprice: { type: Number }, //  시가
    c_hprice: { type: Number }, //  고가
    c_lprice: { type: Number }, //  저가
    // c_prev_com_sym: { type: Number }, //  전일대비기호
    // c_prev_trans_com_cnt: { type: Number }, //  전일거래량대비(계약,주)
    // c_price_sell: { type: Number }, //  (최우선)매도호가
    // c_price_buy: { type: Number }, //  (최우선)매수호가
    // c_trans_price_inc: { type: Number }, //  거래대금증감
    // c_prev_trans_com_rat: { type: Number }, //  전일거래량대비(비율)
    // c_trans_rot: { type: Number }, //  거래회전율
    // c_trans_price: { type: Number }, //  거래비용
    c_power: { type: Number }, //  체결강도
    c_market_price: { type: Number }, //  시가총액
  },
  {
    collection: 'c_raw',
  }
);

cRawSchema.index({ code: 1, c_time: 1 });

export default mongoose.model<IcRaw & mongoose.Document>('c_raw', cRawSchema);
