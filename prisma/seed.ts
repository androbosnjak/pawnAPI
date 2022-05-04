import { PrismaClient } from '@prisma/client';

const users = [
  { firstName: 'Leanne', lastName: 'Graham' },
  { firstName: 'Ervin', lastName: 'Howell' },
  { firstName: 'Clementine', lastName: 'Bauch' },
  { firstName: 'Patricia', lastName: 'Lebsack' },
];

export const seed = async () => {
  const prisma = new PrismaClient();
  try {
    await prisma.customer.createMany({
      data: users,
    });
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
