import { Elysia } from "elysia";
import authRoutes from "./routes/auth";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const app = new Elysia();
const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

async function start() {
  await client.connect();

  app.get("/", () => "Server running successfully");

  app.use(authRoutes);

  app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });
}

start().catch(console.error);
