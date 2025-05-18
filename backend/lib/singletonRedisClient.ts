import { createClient } from 'redis';
import dotenv from 'dotenv';
dotenv.config();

const client = createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: 12650
    }
});

client.on('error', err => console.log('Redis Client Error', err));

// Connect immediately and export the ready client
const getRedisConnection = async () => {
    if (!client.isOpen) {
        await client.connect();
    }
    return client;
};

export default getRedisConnection;

// copied this cheat sheet from chatgpt

/*
  import getRedisConnection from './redisClient';

const demoRedisUsage = async () => {
    const redis = await getRedisConnection();

    // 1. Set key-value
    await redis.set('user:1', 'Ankit');

    // 2. Get key-value
    const value = await redis.get('user:1');
    console.log('GET user:1 =>', value);

    // 3. Set key with TTL (60 seconds)
    await redis.set('session:123', 'active', { EX: 60 });

    // 4. Delete a key
    const deleted = await redis.del('user:1');
    console.log('Deleted user:1 =>', deleted > 0 ? 'yes' : 'no');
};
*/