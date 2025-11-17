const request = require('supertest');
const app = require('../server');

describe('Iteration 2 - GET / (start page)', () => {
  it('renders start template with link to /contact', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toContain('Start now');
    expect(res.text).toContain('/contact');
  });
});
