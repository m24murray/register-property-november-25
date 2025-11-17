const crypto = require('crypto');

function submit(registration) {
  const id = crypto.randomUUID();
  // For demo, no persistence. Return id.
  return { id };
}

module.exports = { submit };