import mongoose from "mongoose";

declare global {
  var __mongooseConn: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } | undefined;
}

const globalForMongoose = globalThis as typeof globalThis & {
  __mongooseConn?: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
};

const cache = (globalForMongoose.__mongooseConn ??= { conn: null, promise: null });

export async function dbConnect() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Missing MONGODB_URI env var");
  }

  if (cache.conn) return cache.conn;

  cache.promise ??= mongoose.connect(uri, {
    bufferCommands: false,
  });

  cache.conn = await cache.promise;
  return cache.conn;
}

