import * as redis from 'redis';

const redisClient = redis.createClient();
redisClient.connect().then(() =>
  console.log(
    `
        #########################################################
                Redis Connection...
        #########################################################
      `
  )
);

export default redisClient;
