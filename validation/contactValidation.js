const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+\d\s]{7,15}$/;

function trimVal(v) {
  return typeof v === 'string' ? v.trim() : '';
}

function validateContact(input) {
  const errors = {};
  const data = {
    firstName: trimVal(input.firstName),
    lastName: trimVal(input.lastName),
    email: trimVal(input.email),
    phone: trimVal(input.phone)
  };

  // firstName
  if (!data.firstName) {
    errors.firstName = 'First name is required';
  } else if (data.firstName.length > 20) {
    errors.firstName = 'First name must be 20 characters or fewer';
  }

  // lastName
  if (!data.lastName) {
    errors.lastName = 'Last name is required';
  } else if (data.lastName.length > 20) {
    errors.lastName = 'Last name must be 20 characters or fewer';
  }

  // email
  if (!data.email) {
    errors.email = 'Email is required';
  } else if (data.email.length > 50) {
    errors.email = 'Email must be 50 characters or fewer';
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.email = 'Enter a valid email address';
  }

  // phone (optional)
  if (data.phone) {
    if (!PHONE_REGEX.test(data.phone)) {
      errors.phone = 'Phone number format is invalid';
    } else if (data.phone.length < 7 || data.phone.length > 15) {
      errors.phone = 'Phone number must be between 7 and 15 characters';
    }
  }

  return { valid: Object.keys(errors).length === 0, errors, data };
}

module.exports = { validateContact };