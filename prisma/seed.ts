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
    const numberOfCustomers = await prisma.customer.count();

    //only add customers if table is empty
    if (numberOfCustomers === 0) {
      await prisma.customer.createMany({
        data: users,
      });
    } else {
      return;
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
