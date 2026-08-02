import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3).max(100),

  email: z.email(),

  password: z.string().min(8),

  role: z.enum(["sales_associate", "branch_head"]),
});

export const loginSchema = z.object({
  email: z.email(),

  password: z.string().min(8),
});