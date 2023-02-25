import redis from 'redis';
import config from '../configs';

export default (async function () {
  const redisInfo = {
    host: config.redis_host,
    port: config.redis_port,
    legacyMode: true,
  };
  const client = redis.createClient(redisInfo);

  client.on('error', (err) => {
    console.error('Redis Client Error', err);
  });

  await client.connect();
  await client.set('connect', 'success');
})();
