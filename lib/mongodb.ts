// 

import mongoose from 'mongoose';

declare global {
  var mongoose: any; // Avoid purging connection between hot reloads in dev
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error(
      '❌ Please define the MONGODB_URI environment variable in .env.local'
    );
  }

  // 🔐 Only log in development mode
  if (process.env.NODE_ENV !== 'production') {
    console.log("✅ MONGODB_URI loaded");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
