import { z } from "zod";

export const startDaySchema = z.object({
  latitude: z.number(),

  longitude: z.number(),

  accuracy: z.number().optional(),
});

export const endDaySchema = z.object({
  latitude: z.number(),

  longitude: z.number(),

  accuracy: z.number().optional(),
});