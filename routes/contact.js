const express = require('express');
const { validateContact } = require('../validation/contactValidation');

const router = express.Router();

function ensureRegistrationSession(req) {
  if (!req.session.registration) {
    req.session.registration = {};
  }
}

router.get('/contact', (req, res) => {
  ensureRegistrationSession(req);
  const data = req.session.registration.contact || {};
  res.render('contact', { data, errors: {} });
});

router.post('/contact', (req, res) => {
  ensureRegistrationSession(req);
  const input = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone
  };
  const result = validateContact(input);
  if (result.valid) {
    req.session.registration.contact = result.data;
    return res.redirect('/address');
  }
  return res.status(200).render('contact', { data: input, errors: result.errors });
});

module.exports = router;