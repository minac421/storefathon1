import mongoose from "mongoose";

/**
 * Connect to MongoDB using a cached connection to prevent overhead in development / hot reload.
 */
export async function connectMongo() {
  if ((mongoose as any).connection?.readyState === 1) {
    // Already connected
    return mongoose.connection;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI environment variable is not defined");
  }

  // Use the existing connection if available (for Next.js hot-reload in dev)
  if ((global as any)._mongooseConn) {
    return (global as any)._mongooseConn;
  }

  const conn = await mongoose.connect(uri, {
    // Add connection options if needed
    dbName: process.env.MONGODB_DB || "conquerors_db",
  });

  (global as any)._mongooseConn = conn;
  return conn;
}
