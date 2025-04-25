// routes/dev-sign.js
const express = require('express');
const router = express.Router();
const { createAuthorizationHeader } = require('../utils/createAuthHeader');

router.post('/sign', (req, res) => {
  const body = req.body;
  const privateKey = process.env.PRIVATE_KEY;
  const subscriberId = process.env.SUBSCRIBER_ID;
  const keyId = process.env.UNIQUE_KEY_ID;

  const header = createAuthorizationHeader(body, privateKey, subscriberId, keyId);
  res.json({ authorizationHeader: header });
});

module.exports = router;
