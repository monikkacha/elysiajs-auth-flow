import Router from "elysia";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUser, findUser } from "../models/user";

const router = new Router();

type AuthRequest = { body: { username: string; password: string } };

router.post("/register", async (req: AuthRequest) => {
  const { username, password } = req.body;
  const existingUser = await findUser(username);

  if (existingUser) {
    return { status: 400, body: "User already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await createUser(username, hashedPassword);
  return { status: 201, body: "User created" };
});

router.post("/login", async (req: AuthRequest) => {
  const { username, password } = req.body;
  const user = await findUser(username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return { status: 401, body: "Invalid credentials" };
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
  return { body: { token } };
});

export default router;
