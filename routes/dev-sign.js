const express = require('express');
const router = express.Router();
const { createAuthorizationHeader } = require('../utils/createAuthHeader');

router.post('/sign', (req, res) => {
  const body = req.body;

  // Body se privateKey, subscriberId, aur uniqueKeyId le rahe hain
  const privateKey = body.private_key;  // Private key directly body se
  const subscriberId = body.subscriber_id;  // Subscriber ID
  const keyId = body.unique_key_id;  // Unique key ID

  // Agar private key missing ho toh error bhej do
  if (!privateKey || !subscriberId || !keyId) {
    return res.status(400).json({
      error: 'Missing required fields: private_key, subscriber_id, or unique_key_id'
    });
  }

  // Header generate karo
  const header = createAuthorizationHeader(body, privateKey, subscriberId, keyId);
  
  res.json({ authorizationHeader: header });
});

module.exports = router;
