import cRaw from '../models/cRaw';
import { endBeforeDate, endBeforeMinute, startBeforeDate, startBeforeMinute, startDate } from '../util/date';
import mRaw from '../models/mRaw';
import { ImRaw } from '../interfaces/mRaw';
import { IcRaw } from '../interfaces/cRaw';

const storkService = {
  // 전일 거래대금 1000억 이상
  transactionAmountOfThePreviousDayMoreThan100BillionWon: async (): Promise<IcRaw[]> => {
    const excludeCodes: string[] = (await storkService.getExcludeItems()).map((val) => {
      return val.idx;
    });
    return await cRaw.aggregate(
      [
        {
          $match: {
            $and: [
              {
                c_time: {
                  $gte: new Date(startBeforeDate()),
                  $lt: new Date(endBeforeDate()),
                },
              },
              { code: { $nin: excludeCodes } },
            ],
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
          $match: { c_accum_trans_price: { $gte: 100000 } },
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
      ],
      {
        allowDiskUse: true,
      }
    );
  },

  // 전일대비 15%이상 (전일1000 -> 1500)
  // 직전 1분 마지막 체결가
  moreThan15percentComparedToThePreviousDay: async (): Promise<IcRaw[]> => {
    const excludeItems: ImRaw[] = await storkService.getExcludeItems();
    const excludeCodes: string[] = excludeItems.map((val) => {
      return val.idx;
    });

    const cRawData: IcRaw[] = await cRaw.aggregate(
      [
        {
          $match: {
            $and: [
              {
                c_time: {
                  $gte: new Date(startBeforeMinute()),
                  $lt: new Date(endBeforeMinute()),
                },
              },
              { code: { $nin: excludeCodes } },
            ],
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
      ],
      {
        allowDiskUse: true,
      }
    );

    return cRawData.filter((cRaw) => {
      const mRawData = excludeItems.find((mRaw) => cRaw.code == mRaw.idx)!;
      if (cRaw.c_price >= mRawData.lp + mRawData.lp * 0.15) {
        return cRaw;
      }
    });
  },

  // 전일 순매수 100억이상 (매수 - 매도)
  aNetPurchaseOfThePreviousDayMoreThan10BillionWon: async (): Promise<IcRaw[]> => {
    const excludeCodes: string[] = (await storkService.getExcludeItems()).map((val) => {
      return val.idx;
    });

    return await cRaw.aggregate(
      [
        {
          $match: {
            $and: [
              {
                c_time: {
                  $gte: new Date(startBeforeDate()),
                  $lt: new Date(endBeforeDate()),
                },
              },
              { code: { $nin: excludeCodes } },
            ],
          },
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
            b_price: { $sum: { $multiply: ['$c_price', '$c_volume'] } },
          },
        },
        {
          $match: {
            b_price: { $gte: 10000000000 },
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
            b_price: 1,
          },
        },
      ],
      {
        allowDiskUse: true,
      }
    );
  },

  // 50억 이상 채결
  checkedMoreThanFiveBillion: async (): Promise<IcRaw[]> => {
    return await cRaw.aggregate(
      [
        {
          $match: {
            c_time: {
              $gte: new Date(startBeforeMinute()),
              $lt: new Date(endBeforeMinute()),
            },
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
            b_price: { $multiply: ['$c_price', '$c_volume'] },
          },
        },
        {
          $match: {
            b_price: { $gte: 5000000000 },
          },
        },
      ],
      {
        allowDiskUse: true,
      }
    );
  },

  // 전일 종가 1000원이상, 스펙주,영업이익률 5% 미만,유보률 800% 미만
  getExcludeItems: async (): Promise<ImRaw[]> => {
    return await mRaw.aggregate(
      [
        {
          $match: {
            $and: [
              { createdAt: { $eq: startDate() } },
              { nm: { $not: /슧팬/ } },
              { opr: { $gte: 5 } },
              { rr: { $gte: 800 } },
              { lp: { $lte: 1000 } },
            ],
          },
        },
      ],
      {
        allowDiskUse: true,
      }
    );
  },
};

export default storkService;
