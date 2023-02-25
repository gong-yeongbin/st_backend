import * as redis from 'redis';
import config from '../configs';

export default (async function () {
  try {
    const client = redis.createClient();
    await client.connect().then(() => console.log('connect success!!!'));
  } catch (error) {
    console.error(error);
  }
})();
