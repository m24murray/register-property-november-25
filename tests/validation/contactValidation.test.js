const { validateContact } = require('../../validation/contactValidation');

describe('contactValidation', () => {
  it('validates a correct payload', () => {
    const result = validateContact({
      firstName: 'Alice',
      lastName: 'Smith',
      email: 'alice@example.com',
      phone: '+44123456789'
    });
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it('flags missing required fields', () => {
    const result = validateContact({ firstName: '', lastName: '', email: '', phone: '' });
    expect(result.valid).toBe(false);
    expect(result.errors.firstName).toBeDefined();
    expect(result.errors.lastName).toBeDefined();
    expect(result.errors.email).toBeDefined();
  });

  it('rejects invalid email', () => {
    const result = validateContact({ firstName: 'A', lastName: 'B', email: 'bad-email', phone: '' });
    expect(result.valid).toBe(false);
    expect(result.errors.email).toMatch(/valid email/i);
  });

  it('rejects overly long names', () => {
    const long = 'x'.repeat(21);
    const result = validateContact({ firstName: long, lastName: long, email: 'a@b.com', phone: '' });
    expect(result.valid).toBe(false);
    expect(result.errors.firstName).toMatch(/20/);
    expect(result.errors.lastName).toMatch(/20/);
  });

  it('rejects invalid phone format', () => {
    const result = validateContact({ firstName: 'A', lastName: 'B', email: 'a@b.com', phone: 'abc' });
    expect(result.valid).toBe(false);
    expect(result.errors.phone).toBeDefined();
  });
});