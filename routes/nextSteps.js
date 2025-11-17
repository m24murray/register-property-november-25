const express = require('express');
const router = express.Router();

// GET /next-steps
router.get('/next-steps', (req, res) => {
  res.render('next-steps');
});

module.exports = router;
