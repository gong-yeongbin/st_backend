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

// 전일 거래대금 1000억 이상
export async function fntransactionAmountOfThePreviousDayMoreThan100BillionWon(): Promise<
  cRawReturn[]
> {
  // 거래대금? 매수, 매도 금액 전체?, 체결 데이터 누적거래 대금?
  const excludeCodes: string[] = await fnExclude();
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
  const excludeCodes: string[] = await fnExclude();
  const mRawData: { code: string; lp: number }[] = await mRaw.aggregate([
    {
      $match: {
        $and: [
          { createdAt: { $eq: startDate() } },
          { idx: { $in: excludeCodes } },
        ],
      },
    },
    {
      $project: {
        _id: 0,
        code: '$idx',
        lp: '$lp',
      },
    },
  ]);
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
    const mRawFind = mRawData.find((m) => c.code == m.code)!;
    if (c.price >= mRawFind.lp + mRawFind.lp * 0.15) {
      return c;
    }
  });
}

// 전일 순매수 100억이상 (매수 - 매도)
export async function fnaNetPurchaseOfThePreviousDayMoreThan10BillionWon(): Promise<
  cRawReturn[]
> {
  const excludeCodes: string[] = await fnExclude();
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

async function fnExclude(): Promise<string[]> {
  const excludeCode: string[] = await fntheCurrentPriceIsOver1000Won(
    await fnGetExcludeItems()
  );
  return excludeCode;
}

// 스펙주,영업이익률 5% 미만,유보률 800% 미만
async function fnGetExcludeItems(): Promise<string[]> {
  const data: { code: string }[] = await mRaw.aggregate([
    {
      $match: {
        $and: [
          { createdAt: { $eq: startDate() } },
          { nm: { $not: /슧팬/ } },
          { opr: { $lt: 5 } },
          { rr: { $lt: 800 } },
        ],
      },
    },
    {
      $project: {
        _id: 0,
        code: '$idx',
      },
    },
  ]);

  return data.map((value) => {
    return value.code;
  });
}

// 현재가 1000원 이상(직전 1분 마지막 체결가)
async function fntheCurrentPriceIsOver1000Won(
  codes: string[]
): Promise<string[]> {
  const data: { code: string }[] = await cRaw.aggregate([
    {
      $match: {
        $and: [
          {
            c_time: {
              $gte: new Date(startBeforeMinute()),
              $lt: new Date(endBeforeMinute()),
            },
          },
          { code: { $in: codes } },
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
      $match: { c_price: { $gte: 1000 } },
    },
    {
      $project: {
        _id: 0,
        code: '$_id',
      },
    },
  ]);
  return data.map((value) => {
    return value.code;
  });
}
