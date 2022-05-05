import { app } from '../app';
import request from 'supertest';
import { seed } from '../prisma/seed';

seed();

describe('POST /pawn', () => {
  it('should return 201 & valid response if loan sum is over 100 and customer exists', async () => {
    const response = await request(app)
      .post('/pawn')
      .send({ loanSum: 100, customerId: 1 });

    expect(response.statusCode).toEqual(201);
  });

  it('should return 400 and error message if loan sum is under 100', async () => {
    const response = await request(app)
      .post('/pawn')
      .send({ loanSum: 99, customerId: 1 });

    expect(response.statusCode).toEqual(400);
  });

  it('should return 500 and error if customer doesnt exists or db is not reachable', async () => {
    const response = await request(app)
      .post('/pawn')
      .send({ loanSum: 101, customerId: 7 });

    expect(response.statusCode).toEqual(500);
  });
});