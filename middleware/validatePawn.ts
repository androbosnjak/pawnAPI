import express, { Request, Response, NextFunction } from 'express';
import { z, AnyZodObject } from 'zod';

export const pawnPostSchema = z.object({
  body: z.object({
    loanSum: z.number(),
    customerId: z.number(),
  }),
});

export const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
      });
      return next();
    } catch (error) {
      return res.status(400).json(error);
    }
  };
