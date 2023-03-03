import schedule from 'node-schedule';
import cheerio from 'cheerio';
import puppeteer, { Browser, Page } from 'puppeteer';
import { ImRaw } from './interfaces/mRaw';
import mRaw from './models/mRaw';
import storkService from './services/stork';
import { startDate } from './util/date';

(function () {
  schedule.scheduleJob('0 0 8 * * 1-7 ', async () => {
    const mRawList: ImRaw[] = await storkService.getMrawList();

    const browser: Browser = await puppeteer.launch({
      headless: true,
      ignoreHTTPSErrors: true,
    });

    for (let i = 0; i < mRawList.length; i++) {
      const page: Page = await browser.newPage();
      await page.goto(`https://finance.naver.com/item/main.naver?code=${mRawList[i].idx}`, {
        waitUntil: 'networkidle2',
      });
      const content: string = await page.content();

      const $ = cheerio.load(content);

      const opr: string =
        $('div.sub_section > table > tbody > tr:nth-child(4) > td:nth-child(11)').text().trim() === ''
          ? $('div.sub_section > table > tbody > tr:nth-child(4) > td:nth-child(10)').text().trim()
          : $('div.sub_section > table > tbody > tr:nth-child(4) > td:nth-child(11)').text().trim();
      const rr: string =
        $('div.sub_section > table > tbody > tr:nth-child(9) > td:nth-child(11)').text().trim() === ''
          ? $('div.sub_section > table > tbody > tr:nth-child(9) > td:nth-child(10)').text().trim()
          : $('div.sub_section > table > tbody > tr:nth-child(9) > td:nth-child(11)').text().trim();

      await mRaw.updateOne(
        { createdAt: startDate(), idx: mRawList[i].idx },
        { $set: { rr: parseFloat(rr), opr: parseFloat(opr) } }
      );
      await page.close();
    }
    await browser.close();
  });
})();
