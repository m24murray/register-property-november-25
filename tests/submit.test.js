const request = require('supertest');
const app = require('../server');

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

describe('Iteration 6 - Submit flow', () => {
  it('POST /submit without contact redirects to /contact', async () => {
    const res = await request(app).post('/submit').send({});
    expect(res.status).toBe(302);
    expect(res.headers.location).toBe('/contact');
  });

  it('POST /submit without address redirects to /address', async () => {
    const agent = request.agent(app);
    await agent.post('/contact').send({ firstName: 'A', lastName: 'B', email: 'a@b.com', phone: '' });
    const res = await agent.post('/submit').send({});
    expect(res.status).toBe(302);
    expect(res.headers.location).toBe('/address');
  });

  it('successful submission redirects to /submitted and clears registration', async () => {
    const agent = request.agent(app);
    await agent.post('/contact').send({ firstName: 'A', lastName: 'B', email: 'a@b.com', phone: '' });
    await agent.post('/address').send({ addressLine1: '1 Test', addressLine2: '', townOrCity: 'Town', county: '', postcode: 'SW1A 2AA' });
    const submitRes = await agent.post('/submit').send({});
    expect(submitRes.status).toBe(302);
    expect(submitRes.headers.location).toBe('/submitted');
    const pageRes = await agent.get('/submitted');
    expect(pageRes.status).toBe(200);
    const match = pageRes.text.match(/Reference ID:\s([0-9a-fA-F-]{36})/);
    expect(match).toBeTruthy();
    expect(UUID_REGEX.test(match[1])).toBe(true);
    // After submission, summary should redirect back to contact (registration cleared)
    const summaryRes = await agent.get('/summary');
    expect(summaryRes.status).toBe(302);
    expect(summaryRes.headers.location).toBe('/contact');
  });

  it('GET /submitted without prior submission redirects to /', async () => {
    const res = await request(app).get('/submitted');
    expect(res.status).toBe(302);
    expect(res.headers.location).toBe('/');
  });
});