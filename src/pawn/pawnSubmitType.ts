import { z } from 'zod';

export const pawn = z.object({
  loanSum: z.number().int().gte(100),
  customerId: z.number().int(),
});
