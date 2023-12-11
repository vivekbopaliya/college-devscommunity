import { z } from "zod";

export const PointsValidtor = z.object({
  point: z.number(),
  userId: z.string(),
});

export type PointRequest = z.infer<typeof PointsValidtor>;
