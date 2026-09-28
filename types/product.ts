import { z } from "zod";

export const externalProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  stock: z.number(),
});

export type ExternalProduct = z.infer<typeof externalProductSchema>;
