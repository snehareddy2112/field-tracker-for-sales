import { z } from "zod";

export const createLeadSchema = z.object({
  name: z.string().min(2),

  contact: z.string().min(5),

  latitude: z.number(),

  longitude: z.number(),

  address: z.string().optional(),
});