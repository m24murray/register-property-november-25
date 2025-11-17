const express = require('express');

const router = express.Router();

function hasContact(req) {
  return req.session.registration && req.session.registration.contact;
}

function hasAddress(req) {
  return req.session.registration && req.session.registration.address;
}

router.get('/summary', (req, res) => {
  if (!hasContact(req)) {
    return res.redirect('/contact');
  }
  if (!hasAddress(req)) {
    return res.redirect('/address');
  }
  const { contact, address } = req.session.registration;
  return res.render('summary', { contact, address });
});

module.exports = router;