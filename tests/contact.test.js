const request = require('supertest');
const app = require('../server');

describe('Iteration 3 - Contact routes', () => {
  it('GET /contact renders form', async () => {
    const res = await request(app).get('/contact');
    expect(res.status).toBe(200);
    expect(res.text).toContain('Contact details');
    expect(res.text).toContain('name="firstName"');
  });

  it('POST /contact with invalid data stays on page showing errors', async () => {
    const res = await request(app)
      .post('/contact')
      .send({ firstName: '', lastName: '', email: 'bad', phone: 'abc' });
    expect(res.status).toBe(200);
    expect(res.text).toContain('There is a problem');
    expect(res.text).toContain('Enter a valid email');
  });

  it('POST /contact with valid data redirects to /address', async () => {
    const res = await request(app)
      .post('/contact')
      .send({ firstName: 'Alice', lastName: 'Smith', email: 'alice@example.com', phone: '+44123456789' });
    expect(res.status).toBe(302);
    expect(res.headers.location).toBe('/address');
  });
});