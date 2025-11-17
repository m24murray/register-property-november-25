const express = require('express');
const { validateAddress } = require('../validation/addressValidation');

const router = express.Router();

function ensureRegistration(req) {
  if (!req.session.registration) {
    req.session.registration = {};
  }
}

function contactExists(req) {
  return req.session.registration && req.session.registration.contact;
}

router.get('/address', (req, res) => {
  ensureRegistration(req);
  if (!contactExists(req)) {
    return res.redirect('/contact');
  }
  const data = req.session.registration.address || {};
  return res.render('address', { data, errors: {} });
});

router.post('/address', (req, res) => {
  ensureRegistration(req);
  if (!contactExists(req)) {
    return res.redirect('/contact');
  }
  const input = {
    addressLine1: req.body.addressLine1,
    addressLine2: req.body.addressLine2,
    townOrCity: req.body.townOrCity,
    county: req.body.county,
    postcode: req.body.postcode
  };
  const result = validateAddress(input);
  if (result.valid) {
    req.session.registration.address = result.data;
    return res.redirect('/summary');
  }
  return res.status(200).render('address', { data: input, errors: result.errors });
});

module.exports = router;