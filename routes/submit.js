const express = require('express');
const { submit } = require('../services/registrationService');

const router = express.Router();

function hasContact(req) {
  return req.session.registration && req.session.registration.contact;
}

function hasAddress(req) {
  return req.session.registration && req.session.registration.address;
}

router.post('/submit', (req, res) => {
  if (!hasContact(req)) {
    return res.redirect('/contact');
  }
  if (!hasAddress(req)) {
    return res.redirect('/address');
  }
  const registration = req.session.registration;
  const result = submit(registration);
  // Structured log
  console.log(JSON.stringify({ event: 'registration_submitted', data: { id: result.id, registration } }));
  delete req.session.registration; // clear journey data
  req.session.lastSubmissionId = result.id;
  return res.redirect('/submitted');
});

router.get('/submitted', (req, res) => {
  const id = req.session.lastSubmissionId;
  if (!id) {
    return res.redirect('/');
  }
  return res.render('submitted', { id });
});

module.exports = router;