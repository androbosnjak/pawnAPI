import { Router, Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

//submit pawn
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const { sum, customerId } = req.body;

  //sum must be over 100 to be accepted
  if (sum < 100) {
    return res.status(400).json({ message: 'loan sum must be at least 100' });
  }

  //submit pawn to database
  try {
    const pawn = await prisma.pawn.create({
      data: {
        loanSum: sum,
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
});

export default router;
