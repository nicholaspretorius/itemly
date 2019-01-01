import * as redisStore from 'cache-manager-redis-store';

export default {
    store: redisStore,
    host: process.env.CACHE_HOST,
    port: process.env.CACHE_PORT,
};