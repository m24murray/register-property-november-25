const POSTCODE_REGEX = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i;

function trimVal(v) {
  return typeof v === 'string' ? v.trim() : '';
}

function validateAddress(input) {
  const errors = {};
  const data = {
    addressLine1: trimVal(input.addressLine1),
    addressLine2: trimVal(input.addressLine2),
    townOrCity: trimVal(input.townOrCity),
    county: trimVal(input.county),
    postcode: trimVal(input.postcode)
  };

  // addressLine1
  if (!data.addressLine1) {
    errors.addressLine1 = 'Address line 1 is required';
  } else if (data.addressLine1.length > 40) {
    errors.addressLine1 = 'Address line 1 must be 40 characters or fewer';
  }

  // addressLine2 optional
  if (data.addressLine2 && data.addressLine2.length > 40) {
    errors.addressLine2 = 'Address line 2 must be 40 characters or fewer';
  }

  // townOrCity
  if (!data.townOrCity) {
    errors.townOrCity = 'Town or city is required';
  } else if (data.townOrCity.length > 30) {
    errors.townOrCity = 'Town or city must be 30 characters or fewer';
  }

  // county optional
  if (data.county && data.county.length > 30) {
    errors.county = 'County must be 30 characters or fewer';
  }

  // postcode
  if (!data.postcode) {
    errors.postcode = 'Postcode is required';
  } else if (!POSTCODE_REGEX.test(data.postcode)) {
    errors.postcode = 'Enter a valid UK postcode';
  }

  return { valid: Object.keys(errors).length === 0, errors, data };
}

module.exports = { validateAddress };