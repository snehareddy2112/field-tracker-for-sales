import { z } from "zod";

export const createActivitySchema = z.object({
  leadId: z.string().min(1),

  notes: z.string().min(1, "Notes are required"),

  latitude: z.number(),

  longitude: z.number(),

  accuracy: z.number().optional(),
});