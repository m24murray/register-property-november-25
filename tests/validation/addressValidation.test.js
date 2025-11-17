const { validateAddress } = require('../../validation/addressValidation');

describe('addressValidation', () => {
  it('validates a correct payload', () => {
    const result = validateAddress({
      addressLine1: '10 Downing Street',
      addressLine2: '',
      townOrCity: 'London',
      county: '',
      postcode: 'SW1A 2AA'
    });
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it('fails when required fields missing', () => {
    const result = validateAddress({ addressLine1: '', addressLine2: '', townOrCity: '', county: '', postcode: '' });
    expect(result.valid).toBe(false);
    expect(result.errors.addressLine1).toBeDefined();
    expect(result.errors.townOrCity).toBeDefined();
    expect(result.errors.postcode).toBeDefined();
  });

  it('rejects invalid postcode', () => {
    const result = validateAddress({ addressLine1: '1 Test', addressLine2: '', townOrCity: 'Testville', county: '', postcode: 'INVALID' });
    expect(result.valid).toBe(false);
    expect(result.errors.postcode).toMatch(/valid UK postcode/i);
  });
});