import moment from 'moment';
import { ImRaw } from '../interfaces/mRaw';
import cRawOne from '../models/cRawOne';
import mRaw from '../models/mRaw';
import { IcRaw } from '../interfaces/cRaw';
import { decrypt, getAd, getAu, getMrawList, getRsi } from '../util/crypt';

const rsiService = {
  minute: async () => {
    const mraw_list: ImRaw[] = await getMrawList();

    const rsi_minute: Promise<ImRaw[]> = Promise.all(
      mraw_list.map(async (mraw, index) => {
        const craw_one_list: IcRaw[] = await cRawOne.aggregate([
          {
            $match: { code: mraw.idx },
          },
          { $sort: { c_time: -1 } },
          { $limit: 14 },
        ]);

        const au: number = getAu(craw_one_list);
        const ad: number = getAd(craw_one_list);

        mraw['nm'] = decrypt(mraw.nm);
        mraw['rsi'] = getRsi(au, ad);
        console.log(mraw.idx, au, ad, mraw.rsi);
        return mraw;
      })
    );

    return rsi_minute;
  },
  day: async () => {
    const mraw_list: ImRaw[] = await getMrawList();

    const rsi_day: Promise<ImRaw[]> = Promise.all(
      mraw_list.map(async (mraw, index) => {
        const today: string = moment(moment().tz('Asia/Seoul').format('YYYY-MM-DD')).toISOString(true);
        const craw_one_list: IcRaw[] = await cRawOne.aggregate([
          {
            $match: {
              $and: [{ c_time: { $lt: today } }, { code: mraw.idx }],
            },
          },
          {
            $group: {
              _id: { $dateToString: { format: '%Y-%m-%d', date: { $dateFromString: { dateString: '$c_time' } } } },
              code: { $last: '$code' },
              c_time: { $max: '$c_time' },
              c_price: { $last: '$c_price' },
              c_prev_com: { $last: '$c_prev_com' },
              c_updown_rate: { $last: '$c_updown_rate' },
              c_accum_volume: { $last: '$c_accum_volume' },
              c_accum_trans_price: { $last: '$c_accum_trans_price' },
              c_volume: { $last: '$c_volume' },
              c_sprice: { $last: '$c_sprice' },
              c_hprice: { $last: '$c_hprice' },
              c_lprice: { $last: '$c_lprice' },
              c_prev_com_sym: { $last: '$c_prev_com_sym' },
              c_prev_trans_com_cnt: { $last: '$c_prev_trans_com_cnt' },
              c_price_sell: { $last: '$c_price_sell' },
              c_price_buy: { $last: '$c_price_buy' },
              c_trans_price_inc: { $last: '$c_trans_price_inc' },
              c_prev_trans_com_rat: { $last: '$c_prev_trans_com_rat' },
              c_trans_rot: { $last: '$c_trans_rot' },
              c_trans_price: { $last: '$c_trans_price' },
              c_power: { $last: '$c_power' },
              c_market_price: { $last: '$c_market_price' },
            },
          },
          {
            $project: {
              _id: 0,
              code: 1,
              c_time: 1,
              c_price: 1,
              c_prev_com: 1,
              c_updown_rate: 1,
              c_accum_volume: 1,
              c_accum_trans_price: 1,
              c_volume: 1,
              c_sprice: 1,
              c_hprice: 1,
              c_lprice: 1,
              c_prev_com_sym: 1,
              c_prev_trans_com_cnt: 1,
              c_price_sell: 1,
              c_price_buy: 1,
              c_trans_price_inc: 1,
              c_prev_trans_com_rat: 1,
              c_trans_rot: 1,
              c_trans_price: 1,
              c_power: 1,
              c_market_price: 1,
            },
          },
          {
            $limit: 14,
          },
          {
            $sort: { c_time: -1 },
          },
        ]);
        console.log(craw_one_list.length);

        const au: number = getAu(craw_one_list);
        const ad: number = getAd(craw_one_list);

        mraw['nm'] = decrypt(mraw.nm);
        mraw['rsi'] = getRsi(au, ad);

        return mraw;
      })
    );

    return rsi_day;
  },
};

export default rsiService;
