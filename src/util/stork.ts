import cRaw from '../models/cRaw';
import { cRawReturn } from '../interfaces/cRaw';
import {
  endBeforeDate,
  endBeforeMinute,
  startBeforeDate,
  startBeforeMinute,
  startDate,
} from './date';
import mRaw from '../models/mRaw';
import { ImRaw } from '../interfaces/mRaw';

// 전일 거래대금 1000억 이상
export async function fntransactionAmountOfThePreviousDayMoreThan100BillionWon(): Promise<
  cRawReturn[]
> {
  const excludeCodes: string[] = (await fnGetExcludeItems()).map((val) => {
    return val.idx;
  });

  return await cRaw.aggregate([
    {
      $match: {
        $and: [
          {
            c_time: {
              $gte: new Date(startBeforeDate()),
              $lt: new Date(endBeforeDate()),
            },
          },
          { code: { $in: excludeCodes } },
        ],
      },
    },
    {
      $sort: { c_time: -1 },
    },
    {
      $group: {
        _id: '$code',
        c_accum_trans_price: { $first: '$c_accum_trans_price' },
      },
    },
    {
      $match: { c_accum_trans_price: { $gte: 100000 } },
    },
    {
      $project: {
        _id: 0,
        code: '$_id',
        price: '$c_accum_trans_price',
      },
    },
  ]);
}

// 전일대비 15%이상 (전일1000 -> 1500)
// 직전 1분 마지막 체결가
export async function fnmoreThan15percentComparedToThePreviousDay(): Promise<
  cRawReturn[]
> {
  const mRawData: ImRaw[] = await fnGetExcludeItems();
  const excludeCodes: string[] = mRawData.map((val) => {
    return val.idx;
  });

  const cRawData: { code: string; price: number }[] = await cRaw.aggregate([
    {
      $match: {
        $and: [
          {
            c_time: {
              $gte: new Date(startBeforeMinute()),
              $lt: new Date(endBeforeMinute()),
            },
          },
          { code: { $in: excludeCodes } },
        ],
      },
    },
    {
      $sort: { c_time: -1 },
    },
    {
      $group: {
        _id: '$code',
        c_price: { $first: '$c_price' },
      },
    },
    {
      $project: {
        _id: 0,
        code: '$_id',
        price: '$c_price',
      },
    },
  ]);

  return cRawData.filter((c) => {
    const mRawFind = mRawData.find((m) => c.code == m.idx)!;
    if (c.price >= mRawFind.lp + mRawFind.lp * 0.15) {
      return c;
    }
  });
}

// 전일 순매수 100억이상 (매수 - 매도)
export async function fnaNetPurchaseOfThePreviousDayMoreThan10BillionWon(): Promise<
  cRawReturn[]
> {
  const excludeCodes: string[] = (await fnGetExcludeItems()).map((val) => {
    return val.idx;
  });

  return await cRaw.aggregate([
    {
      $match: {
        $and: [
          {
            c_time: {
              $gte: new Date(startBeforeDate()),
              $lt: new Date(endBeforeDate()),
            },
          },
          { code: { $in: excludeCodes } },
        ],
      },
    },
    {
      $group: {
        _id: '$code',
        price: { $sum: { $multiply: ['$c_price', '$c_volume'] } },
      },
    },
    {
      $match: {
        price: { $gte: 10000000000 },
      },
    },
    {
      $project: {
        _id: 0,
        code: '$_id',
        price: 1,
      },
    },
  ]);
}

// 50억 이상 채결
export async function fnCheckedMoreThanFiveBillion(): Promise<cRawReturn[]> {
  return await cRaw.aggregate([
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
        code: 1,
        price: { $multiply: ['$c_price', '$c_volume'] },
      },
    },
    {
      $match: {
        price: { $gte: 5000000000 },
      },
    },
  ]);
}

// 전일 종가 1000원이상, 스펙주,영업이익률 5% 미만,유보률 800% 미만
async function fnGetExcludeItems(): Promise<ImRaw[]> {
  return await mRaw.aggregate([
    {
      $match: {
        $and: [
          { createdAt: { $eq: startDate() } },
          { nm: { $not: /슧팬/ } },
          { opr: { $lt: 5 } },
          { rr: { $lt: 800 } },
          { lp: { $gte: 1000 } },
        ],
      },
    },
  ]);
}
