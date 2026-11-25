import { z } from 'zod'

const itemFields = z.object({
  name: z.string('must be text').trim().min(3, 'at least 3 characters'),
  price: z.number('must be a number').positive('must be > 0'),
  category: z.enum(['book', 'game', 'tool', 'misc'], 'unknown category'),
  tags: z.array(z.string()),
  author: z.object({
    name: z.string(),
    country: z.string().length(2),
  }).optional(),
})

export const itemSchema = itemFields.extend({
  category: itemFields.shape.category.default('misc'),
  tags: itemFields.shape.tags.default([]),
})

export const itemPatchSchema = itemFields.partial()

export const listQuerySchema = z.object({
  q: z.string().optional(),
  page: z.coerce.number('page must be a number').int().min(1, 'page starts at 1').optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
})