const request = require('supertest');
const app = require('../server');

describe('Iteration 4 - Address routes', () => {
  it('GET /address without contact redirects to /contact', async () => {
    const res = await request(app).get('/address');
    expect(res.status).toBe(302);
    expect(res.headers.location).toBe('/contact');
  });

  it('POST /address without contact redirects to /contact', async () => {
    const res = await request(app).post('/address').send({});
    expect(res.status).toBe(302);
    expect(res.headers.location).toBe('/contact');
  });

  it('GET /address renders form when contact exists', async () => {
    const agent = request.agent(app);
    // First set contact
    await agent.post('/contact').send({ firstName: 'A', lastName: 'B', email: 'a@b.com', phone: '' });
    const res = await agent.get('/address');
    expect(res.status).toBe(200);
    expect(res.text).toContain('Address details');
  });

  it('POST /address invalid data stays on page with errors', async () => {
    const agent = request.agent(app);
    await agent.post('/contact').send({ firstName: 'A', lastName: 'B', email: 'a@b.com', phone: '' });
    const res = await agent.post('/address').send({ addressLine1: '', townOrCity: '', postcode: 'BAD' });
    expect(res.status).toBe(200);
    expect(res.text).toContain('There is a problem');
    expect(res.text).toContain('Enter a valid UK postcode');
  });

  it('POST /address valid data redirects to /summary', async () => {
    const agent = request.agent(app);
    await agent.post('/contact').send({ firstName: 'A', lastName: 'B', email: 'a@b.com', phone: '' });
    const res = await agent.post('/address').send({ addressLine1: '1 Test', addressLine2: '', townOrCity: 'Town', county: '', postcode: 'SW1A 2AA' });
    expect(res.status).toBe(302);
    expect(res.headers.location).toBe('/summary');
  });
});