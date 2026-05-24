import { z } from "zod";

export const itemStatusSchema = z.enum(["draft", "active", "archived"]);

export const itemSchema = z.object({
  id: z.string().min(1).meta({ description: "Item ID" }),
  name: z.string().min(1).meta({ description: "Item name" }),
  description: z.string().nullable().optional().meta({ description: "Item description" }),
  status: itemStatusSchema.default("draft").meta({ description: "Item status" }),
  createdAt: z.string().datetime().meta({ description: "Creation timestamp" }),
  updatedAt: z.string().datetime().meta({ description: "Update timestamp" }),
});

export const itemListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  keyword: z.string().optional(),
  status: itemStatusSchema.optional(),
});

export const itemListResponseSchema = z.object({
  data: z.array(itemSchema),
  total: z.number().int().nonnegative(),
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
});

export const createItemSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});

export type ItemStatus = z.infer<typeof itemStatusSchema>;
export type Item = z.infer<typeof itemSchema>;
export type ItemListQuery = z.infer<typeof itemListQuerySchema>;
export type ItemListResponse = z.infer<typeof itemListResponseSchema>;
export type CreateItemInput = z.infer<typeof createItemSchema>;
