import redis from 'redis';
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

  client.on('error', (err) => {
    console.error('Redis Client Error', err);
  });

  client.on('ready', (err) => {
    console.log('Redis is ready', err);
  });

  await client.connect();
  await client.set('connect', 'success');
})();
