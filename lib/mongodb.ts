import mongoose from 'mongoose';
console.log("🌐 In mongodb.ts → MONGODB_URI:", process.env.MONGODB_URI);

declare global {
  var mongoose: any; // This is to avoid purging connection between hot reloads in development
}



/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

if (!process.env.MONGODB_URI) {
  console.error("❌ MONGODB_URI not found. Is .env.local loaded?");
  throw new Error("Please define MONGODB_URI in .env.local");
}


  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}