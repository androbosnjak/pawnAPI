import { Router, Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { pawnPostSchema, validate } from '../middleware/validatePawn';

const prisma = new PrismaClient();
const router = Router();

interface TypedRequestBody<T> extends Request {
  body: T;
}

//submit pawn
router.post(
  '/',
  validate(pawnPostSchema),
  async (
    req: TypedRequestBody<{ loanSum: number; customerId: number }>,
    res: Response,
    next: NextFunction
  ) => {
    const { loanSum, customerId } = req.body;

    //sum must be over 100 to be accepted
    if (loanSum < 100) {
      return res.status(400).json({ error: 'loan sum must be at least 100' });
    }

    //submit pawn to database
    try {
      const pawn = await prisma.pawn.create({
        data: {
          loanSum,
          customer: {
            connect: {
              id: customerId,
            },
          },
        },
      });

      res.status(201).json({ pawn });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
);

export default router;
