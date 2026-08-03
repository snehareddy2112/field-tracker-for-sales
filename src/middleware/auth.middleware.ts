import { NextRequest } from "next/server";

import { verifyToken } from "@/lib/auth";
import { AUTH_COOKIE } from "@/constants/auth";
import User from "@/models/User";
import { connectDB } from "@/config/database";

export async function requireAuth(request: NextRequest) {
  await connectDB();

  const token = request.cookies.get(AUTH_COOKIE)?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const payload = verifyToken(token);

  const user = await User.findById(payload.userId).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}