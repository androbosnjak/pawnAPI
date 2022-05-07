import { Router, Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { validateRequestBody } from 'zod-express-middleware';
import { z } from 'zod';

const prisma = new PrismaClient();
const router = Router();

//submit pawn
router.post(
  '/',
  validateRequestBody(
    z.object({
      loanSum: z.number().int().gte(100),
      customerId: z.number().int(),
    })
  ),
  async (req: Request, res: Response, next: NextFunction) => {
    const { loanSum, customerId } = req.body;

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
