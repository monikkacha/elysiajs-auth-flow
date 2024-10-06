import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

const userSchema = {
  username: String,
  password: String,
};

async function createUser(username: string, password: string) {
  const db = client.db("yourDatabase");
  await db.collection("users").insertOne({ username, password });
}

async function findUser(username: string) {
  const db = client.db("yourDatabase");
  return await db.collection("users").findOne({ username });
}

export { createUser, findUser };
