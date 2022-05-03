import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

//submit pawn
router.post('/', async (req: Request, res: Response, next) => {
  const { sum, customerId } = req.body;

  if (sum < 100) {
    console.log('sum not over 100');
    return res.status(400).json({ message: 'loan sum must be at least 100' });
  }
  console.log('Trying to create pawn...');
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
