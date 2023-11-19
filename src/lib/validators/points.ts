import { z } from "zod";

export const PointsValidtor = z.object({
  point: z.any(),
  userId: z.string(),
});

export type PointRequest = z.infer<typeof PointsValidtor>;
