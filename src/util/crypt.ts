import moment from 'moment';
import { IcRaw } from '../interfaces/cRaw';
import { ImRaw } from '../interfaces/mRaw';
import mRaw from '../models/mRaw';

export function encrypt(raw: string) {
  let ret = '';
  raw.split('').map((val) => {
    ret += String.fromCharCode(val.charCodeAt(0) + 3);
  });
  return ret;
}

export function decrypt(raw: string) {
  let ret = '';
  raw.split('').map((val) => {
    ret += String.fromCharCode(val.charCodeAt(0) - 3);
  });
  return ret;
}

export function getAu(args: IcRaw[]) {
  const au: number = args.reduce((acc, cur, i, arr) => {
    if (cur.c_prev_com > 0) acc += cur.c_prev_com;
    if (i === arr.length - 1) acc /= 14;
    return acc;
  }, 0);
  return au;
}

export function getAd(args: IcRaw[]) {
  const ad: number = args.reduce((acc, cur, i, arr) => {
    if (cur.c_prev_com < 0) acc += Math.abs(cur.c_prev_com);
    if (i === arr.length - 1) acc /= 14;
    return acc;
  }, 0);
  return ad;
}

export function getRsi(au: number, ad: number) {
  return Number(((au / (au + ad)) * 100).toFixed(2));
}

export async function getMrawList(): Promise<ImRaw[]> {
  const today: string = moment(moment().tz('Asia/Seoul').format('YYYY-MM-DD')).toISOString(true);
  return await mRaw.aggregate([
    {
      $match: {
        $and: [{ opr: { $gt: 5 } }, { rr: { $gt: 800 } }, { lp: { $gt: '00001000' } }, { createdAt: { $gte: today } }],
      },
    },
  ]);
}
