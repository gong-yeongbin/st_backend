import moment from 'moment-timezone';
import schedule from 'node-schedule';
import cheerio from 'cheerio';
import { ImRaw } from './interfaces/mRaw';
import mRaw from './models/mRaw';
import storkService from './services/stork';
import { startDate } from './util/date';
import axios from 'axios';

(function () {
  schedule.scheduleJob('0 10 7 * * 1-7 ', async () => {
    await storkService.getRsi();

    console.log(`crawling start... ${moment().format('YYYY-MM-DD HH:mm:ss')}`);
    const mRawList: ImRaw[] = await storkService.getMrawList();

    for (let i = 0; i < mRawList.length; i++) {
      try {
        const content = await axios.get(`https://finance.naver.com/item/main.naver?code=${mRawList[i].idx}`);

        const $ = cheerio.load(content.data);

        let opr: string =
          $('div.sub_section > table > tbody > tr:nth-child(4) > td:nth-child(11)').text().trim().replace(',', '') ===
          ''
            ? $('div.sub_section > table > tbody > tr:nth-child(4) > td:nth-child(10)').text().trim().replace(',', '')
            : $('div.sub_section > table > tbody > tr:nth-child(4) > td:nth-child(11)').text().trim().replace(',', '');
        let rr: string =
          $('div.sub_section > table > tbody > tr:nth-child(9) > td:nth-child(11)').text().trim().replace(',', '') ===
          ''
            ? $('div.sub_section > table > tbody > tr:nth-child(9) > td:nth-child(10)').text().trim().replace(',', '')
            : $('div.sub_section > table > tbody > tr:nth-child(9) > td:nth-child(11)').text().trim().replace(',', '');

        opr = opr == '' ? '0' : opr;
        rr = rr == '' ? '0' : rr;

        await mRaw.updateOne(
          { createdAt: startDate(), idx: mRawList[i].idx },
          { $set: { rr: parseFloat(rr), opr: parseFloat(opr) } }
        );
      } catch (error) {
        console.log(error);
        console.log('error code : ', mRawList[i].idx);
      }
    }
    console.log(`crawling end... ${moment().format('YYYY-MM-DD HH:mm:ss')}`);
  });
})();
