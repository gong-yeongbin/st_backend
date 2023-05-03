import moment, { Moment } from 'moment-timezone';
import { IcRaw } from './interfaces/cRaw';
import cRaw from './models/cRaw';

export default (async function () {
  const before_minute = moment(moment().tz('Asia/Seoul').subtract(1, 'minute').format('YYYY-MM-DD HH:mm')).toISOString(
    true
  );
  const now_minute = moment(moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm')).tz('Asia/Seoul').toISOString(true);
  console.log(before_minute);
  const pipeline = [
    {
      $match: {
        $and: [
          { operationType: 'insert' },
          {
            'fullDocument.c_time': {
              $gte: '2023-04-27T10:13:00.000+09:00',
              // $lt: '2023-04-27T10:17:00.000+09:00',
            },
          },
        ],
      },
    },
    {
      $sort: { 'fullDocument.c_time': -1 },
    },
    {
      $group: {
        _id: '$code',
        c_time: { $first: '$fullDocument.c_time' },
        c_price: { $first: '$fullDocument.c_price' },
        c_prev_com: { $first: '$fullDocument.c_prev_com' },
        c_updown_rate: { $first: '$fullDocument.c_updown_rate' },
        c_accum_volume: { $first: '$fullDocument.c_accum_volume' },
        c_accum_trans_price: { $first: '$fullDocument.c_accum_trans_price' },
        c_volume: { $first: '$fullDocument.c_volume' },
        c_sprice: { $first: '$fullDocument.c_sprice' },
        c_hprice: { $first: '$fullDocument.c_hprice' },
        c_lprice: { $first: '$fullDocument.c_lprice' },
        c_prev_com_sym: { $first: '$fullDocument.c_prev_com_sym' },
        c_prev_trans_com_cnt: { $first: '$fullDocument.c_prev_trans_com_cnt' },
        c_price_sell: { $first: '$fullDocument.c_price_sell' },
        c_price_buy: { $first: '$fullDocument.c_price_buy' },
        c_trans_price_inc: { $first: '$fullDocument.c_trans_price_inc' },
        c_prev_trans_com_rat: { $first: '$fullDocument.c_prev_trans_com_rat' },
        c_trans_rot: { $first: '$fullDocument.c_trans_rot' },
        c_trans_price: { $first: '$fullDocument.c_trans_price' },
        c_power: { $first: '$fullDocument.c_power' },
        c_market_price: { $first: '$fullDocument.c_market_price' },
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
  ];
  const changeStream = cRaw.watch(pipeline);

  changeStream.on('change', (change) => {
    console.log(change);
    // if (change.operationType == 'insert') {
    //   const cRawData: IcRaw = change.fullDocument;
    //   console.log(cRawData);

    //   if (cRawData.c_price * cRawData.c_volume >= 5000000000) {
    //     // 50억 이상 체결
    //   }
    // }
  });
})();
