import User from "@/models/User";
import { hashPassword, comparePassword } from "@/lib/password";
import { generateToken } from "@/lib/auth";
import { UserRole } from "@/constants/roles";

interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

interface LoginUserInput {
  email: string;
  password: string;
}

type AuthUserRecord = {
  _id: { toString: () => string };
  name: string;
  email: string;
  role: UserRole;
  manager?: string | { toString: () => string } | null;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

function sanitizeUser(user: AuthUserRecord) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    manager: user.manager ? user.manager.toString() : null,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export async function registerUser(data: RegisterUserInput) {
  const existingUser = await User.findOne({
    email: data.email.toLowerCase(),
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(data.password);

  const user = await User.create({
    ...data,
    email: data.email.toLowerCase(),
    password: hashedPassword,
  });

  const token = generateToken({
    userId: user._id.toString(),
    role: user.role,
  });

  return {
    user: sanitizeUser(user),
    token,
  };
}

export async function loginUser(data: LoginUserInput) {
  const user = await User.findOne({
    email: data.email.toLowerCase(),
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await comparePassword(
    data.password,
    user.password
  );

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken({
    userId: user._id.toString(),
    role: user.role,
  });

  return {
    user: sanitizeUser(user),
    token,
  };
}

export async function getCurrentUser(userId: string) {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return sanitizeUser(user);
}