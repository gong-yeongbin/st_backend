import moment from 'moment-timezone';
import schedule from 'node-schedule';
import cheerio from 'cheerio';
import puppeteer, { Browser, Page } from 'puppeteer';
import { ImRaw } from './interfaces/mRaw';
import mRaw from './models/mRaw';
import storkService from './services/stork';
import { startDate } from './util/date';

(function () {
  // schedule.scheduleJob('0 10 6 * * 1-7 ', async () => {
  schedule.scheduleJob('0 5 16 * * 1-7 ', async () => {
    await storkService.getRsi();

    console.log(`crawling start... ${moment().format('YYYY-MM-DD HH:mm:ss')}`);
    const mRawList: ImRaw[] = await storkService.getMrawList();

    const browser: Browser = await puppeteer.launch({
      headless: true,
      ignoreHTTPSErrors: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process', // <- this one doesn't works in Windows
        '--disable-gpu',
      ],
    });

    for (let i = 0; i < mRawList.length; i++) {
      try {
        const page: Page = await browser.newPage();
        await page.goto(`https://finance.naver.com/item/main.naver?code=${mRawList[i].idx}`, {
          waitUntil: 'networkidle2',
        });
        const content: string = await page.content();

        const $ = cheerio.load(content);

        const opr: string =
          $('div.sub_section > table > tbody > tr:nth-child(4) > td:nth-child(11)').text().trim().replace(',', '') ===
          ''
            ? $('div.sub_section > table > tbody > tr:nth-child(4) > td:nth-child(10)').text().trim().replace(',', '')
            : $('div.sub_section > table > tbody > tr:nth-child(4) > td:nth-child(11)').text().trim().replace(',', '');
        const rr: string =
          $('div.sub_section > table > tbody > tr:nth-child(9) > td:nth-child(11)').text().trim().replace(',', '') ===
          ''
            ? $('div.sub_section > table > tbody > tr:nth-child(9) > td:nth-child(10)').text().trim().replace(',', '')
            : $('div.sub_section > table > tbody > tr:nth-child(9) > td:nth-child(11)').text().trim().replace(',', '');

        await mRaw.updateOne(
          { createdAt: startDate(), idx: mRawList[i].idx },
          { $set: { rr: parseFloat(rr), opr: parseFloat(opr) } }
        );
        console.log('crawling ...ing ', mRawList[i].idx);
        await page.close();
      } catch (error) {
        console.log(error);
      }
    }
    console.log(`crawling end... ${moment().format('YYYY-MM-DD HH:mm:ss')}`);
    await browser.close();
  });
})();
