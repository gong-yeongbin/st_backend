import { scheduleJob } from 'node-schedule';
import moment from 'moment-timezone';
import cRaw from './models/cRaw';
import cRawOne from './models/cRawOne';
import { IcRaw } from './interfaces/cRaw';

export default (function () {
  scheduleJob('0 */1 8-18 * * MON-FRI', async function () {
    const before_minute: string = moment(moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss'))
      .subtract(1, 'minute')
      .toISOString(true);
    const now_minute: string = moment(moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss')).toISOString(true);

    const craw_data: IcRaw[] = await cRaw.aggregate([
      {
        $match: {
          $and: [{ c_time: { $gte: before_minute, $lt: now_minute } }],
        },
      },
      {
        $sort: { c_time: -1 },
      },
      {
        $group: {
          _id: '$code',
          c_time: { $first: '$c_time' },
          c_price: { $first: '$c_price' },
          c_prev_com: { $first: '$c_prev_com' },
          c_updown_rate: { $first: '$c_updown_rate' },
          c_accum_volume: { $first: '$c_accum_volume' },
          c_accum_trans_price: { $first: '$c_accum_trans_price' },
          c_volume: { $first: '$c_volume' },
          c_sprice: { $first: '$c_sprice' },
          c_hprice: { $first: '$c_hprice' },
          c_lprice: { $first: '$c_lprice' },
          c_prev_com_sym: { $first: '$c_prev_com_sym' },
          c_prev_trans_com_cnt: { $first: '$c_prev_trans_com_cnt' },
          c_price_sell: { $first: '$c_price_sell' },
          c_price_buy: { $first: '$c_price_buy' },
          c_trans_price_inc: { $first: '$c_trans_price_inc' },
          c_prev_trans_com_rat: { $first: '$c_prev_trans_com_rat' },
          c_trans_rot: { $first: '$c_trans_rot' },
          c_trans_price: { $first: '$c_trans_price' },
          c_power: { $first: '$c_power' },
          c_market_price: { $first: '$c_market_price' },
        },
      },
      {
        $project: {
          _id: 0,
          code: '$_id',
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
    ]);

    await cRawOne.insertMany(craw_data);
  });
})();
