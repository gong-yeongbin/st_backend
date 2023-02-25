import * as redis from 'redis';
import config from '../configs';

export default (async function () {
  const redisInfo = {
    socket: {
      host: config.redis_host,
      port: config.redis_port,
      legacyMode: true,
    },
  };
  const client = redis.createClient();
  await client.connect();
  await client.set('connect', 'success');
})();
