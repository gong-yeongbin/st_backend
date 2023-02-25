import redis from 'redis';
import config from '../configs';

export default (async function () {
  const redisInfo = {
    host: config.redis_host,
    port: config.redis_port,
    password: config.redis_password,
  };
  const redisClient = redis.createClient(redisInfo);

  redisClient.on('error', (err) => {
    console.error('Redis Client Error', err);
  });

  await redisClient.connect();
})();
