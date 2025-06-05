// /lib/mongodb.ts
import mongoose, { Connection } from "mongoose";

// 1) Make sure all model files are imported exactly once at the top:
//    - This runs each model’s `mongoose.model(...)` so Mongoose knows about them.
import "@/models/Employee";
import "@/models/Project";
import "@/models/Review";

declare global {
  // In dev mode, Next’s hot-reload keeps one process alive. We attach this
  // global so we don’t open multiple connections on every file-change.
  var _mongo: {
    conn: Connection | null;
    promise: Promise<typeof mongoose> | null;
  };
}

let cached = global._mongo;
if (!cached) {
  cached = global._mongo = { conn: null, promise: null };
}

export async function connectToDatabase(): Promise<Connection> {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error(
      "❌ Please define the MONGODB_URI environment variable in Vercel (or .env.local)"
    );
  }

  // In dev, log so you can confirm the URI is loaded:
  if (process.env.NODE_ENV !== "production") {
    console.log("✅ MONGODB_URI loaded:", MONGODB_URI);
  }

  if (cached.conn) {
    // If we already connected, reuse it
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      // For mongoose >= 6, useNewUrlParser/useUnifiedTopology are default.
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  const mongooseInstance = await cached.promise;
  cached.conn = mongooseInstance.connection;
  return cached.conn;
}
