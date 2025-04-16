import { MongoClient } from 'mongodb';
const MONGODB_URI ='mongodb://localhost:27017/personal_finance';
const uri =MONGODB_URI;
if (!uri) throw new Error('Missing MONGODB_URI in .env.local');

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;