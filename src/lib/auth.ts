import jwt from "jsonwebtoken";
import { env } from "@/config/env";
import { UserRole } from "@/constants/roles";

export interface JwtPayload {
  userId: string;
  role: UserRole;
}

const JWT_EXPIRES_IN = "7d";

export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
}