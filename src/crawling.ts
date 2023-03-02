import axios from 'axios';
import cheerio from 'cheerio';
import { ImRaw } from './interfaces/mRaw';
import storkService from './services/stork';

const crawling = async () => {
  try {
    const mRawList: ImRaw[] = await storkService.getMrawList();
    const urls: string[] = mRawList.map((mRaw) => {
      return `https://finance.naver.com/item/main.naver?code=${mRaw.idx}`;
    });

    await axios.all(urls.map((url) => axios.get(url))).then(
      axios.spread(function (...urls) {
        urls.map((url) => {
          const $ = cheerio.load(url.data);
          const data = $(
            '#content > div.section.cop_analysis > div.sub_section > table > tbody > tr:nth-child(3) > td.last.cell_strong'
          ).text();
          console.log(data);
        });
      })
    );
    // mRawList.map((mRaw) => {
    //   setInterval(async () => {
    //     const html = await axios.get(`https://finance.naver.com/item/main.naver?code=${mRaw.idx}`);
    //     const $ = cheerio.load(html.data);

    //     const data = $(
    //       '#content > div.section.cop_analysis > div.sub_section > table > tbody > tr:nth-child(3) > td.last.cell_strong'
    //     ).text();
    //     console.log(data);
    //   }, 5000);
    // });

    // mRawList.map(async (mRaw) => {
    // });
  } catch (error) {
    console.log(error);
  }
};

export default crawling;
