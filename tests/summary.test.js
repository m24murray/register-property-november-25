const request = require('supertest');
const app = require('../server');

describe('Iteration 5 - Summary route', () => {
  it('redirects to /contact if contact missing', async () => {
    const res = await request(app).get('/summary');
    expect(res.status).toBe(302);
    expect(res.headers.location).toBe('/contact');
  });

  it('redirects to /address if address missing', async () => {
    const agent = request.agent(app);
    await agent.post('/contact').send({ firstName: 'A', lastName: 'B', email: 'a@b.com', phone: '' });
    const res = await agent.get('/summary');
    expect(res.status).toBe(302);
    expect(res.headers.location).toBe('/address');
  });

  it('renders summary when contact and address present', async () => {
    const agent = request.agent(app);
    await agent.post('/contact').send({ firstName: 'A', lastName: 'B', email: 'a@b.com', phone: '' });
    await agent.post('/address').send({ addressLine1: '1 Test', addressLine2: '', townOrCity: 'Town', county: '', postcode: 'SW1A 2AA' });
    const res = await agent.get('/summary');
    expect(res.status).toBe(200);
    expect(res.text).toContain('Check your answers');
    expect(res.text).toContain('A');
    expect(res.text).toContain('SW1A 2AA');
    expect(res.text).toContain('form method="post"');
    expect(res.text).toContain('action="/submit"');
  });
});