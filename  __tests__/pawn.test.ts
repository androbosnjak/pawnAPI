import { app } from '../app';
import request from 'supertest';

describe('POST /pawn', () => {
  it('should return 201 & valid response if loan sum is over 100 and customer exists', async () => {
    const response = await request(app)
      .post('/pawn')
      .send({ loanSum: 100, customerId: 1 });

    expect(response.statusCode).toEqual(201);
  });

  it('should return 400 and error message if loan sum is under 100 or the parameter is wrong type', async () => {
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
  it('should return 400 and error if wrong type is sent as loanSum', async () => {
    const response = await request(app)
      .post('/pawn')
      .send({ loanSum: '101', customerId: 7 });

    expect(response.statusCode).toEqual(400);
  });
});
