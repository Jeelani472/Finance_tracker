import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) throw new Error('Missing MONGODB_URI in .env.local');

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // In dev, use a global variable so it doesn't create multiple connections
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, just connect
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
