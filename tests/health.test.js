const request = require('supertest');
const app = require('../server');

describe('Iteration 1 - GET /health', () => {
  it('returns ok and hello world message', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok', msg: 'hello world' });
  });
});
