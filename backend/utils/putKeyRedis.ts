import { RedisArgument } from "redis";
import getRedisConnection from "../lib/singletonRedisClient.js";

async function insertKey(session:RedisArgument, jwtKey: string) {
  try {
    const connection = await getRedisConnection();
    await connection.set(session,jwtKey,{EX:90});
  } catch (error) {
    console.error(error);
  }
}

export default insertKey;