import { Request, Response } from "express";
import getRedisConnection from "../../lib/singletonRedisClient.js"; // adjust import path if needed
import { RedisArgument } from "redis";

export default async function getJwtKey(req: Request, res: Response) {
  const session = req.query.uuid as  RedisArgument;
  if (!session) {
    return res.status(400).json({ error: "Missing session ID" });
  }

  try {
    const connection = await getRedisConnection();
    const value = await connection.get(session);
    if (value !== null) {
      await connection.del(session);
    }
    return res.status(200).json({ token: value }); // ✅ send back the token
  } catch (err) {
    console.error("Redis error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
