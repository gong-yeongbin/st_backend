import mongoose from 'mongoose';

const c_rawSchema = new mongoose.Schema(
  {
    c_time: Date, //  체결시간
    code: String, //  코드
    c_price: Number, //  체결가
    c_prev_com: Number, //  전일대비
    c_updown_rate: Number, //  등락율
    c_accum_volume: Number, //  누적체결량
    c_accum_trans_price: Number, //  누적거래대금
    c_volume: Number, //  체결량
    c_sprice: Number, //  시가
    c_hprice: Number, //  고가
    c_lprice: Number, //  저가
    c_prev_com_sym: Number, //  전일대비기호
    c_prev_trans_com_cnt: Number, //  전일거래량대비(계약,주)
    c_price_sell: Number, //  (최우선)매도호가
    c_price_buy: Number, //  (최우선)매수호가
    c_trans_price_inc: Number, //  거래대금증감
    c_prev_trans_com_rat: Number, //  전일거래량대비(비율)
    c_trans_rot: Number, //  거래회전율
    c_trans_price: Number, //  거래비용
    c_power: Number, //  체결강도
    c_market_price: Number, //  시가총액
    gubun: String, // kospi, kosdaq 구분
  },
  {
    collection: 'c_raw',
  }
);

c_rawSchema.index({ code: 1, c_time: 1 });

export default mongoose.model('c_raw', c_rawSchema);
