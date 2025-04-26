const express = require('express');
const { decryptChallenge } = require('../utils/decryptChallenge');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const router = express.Router();

// Load your private and public keys
const privateKeyPath = path.join(__dirname, '../keys/private_key.pem');
const publicKeyPath = path.join(__dirname, '../keys/public_key.pem');

const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
const publicKey = fs.readFileSync(publicKeyPath, 'utf8');

// Handle on_subscribe callback
router.post('/', (req, res) => {
  try {
    const encryptedChallenge = req.body.challenge;

    if (!encryptedChallenge) {
      return res.status(400).json({ message: 'Missing challenge in request body' });
    }

    const decryptedChallenge = decryptChallenge(encryptedChallenge, privateKey, publicKey);

    return res.json({
      answer: decryptedChallenge
    });

  } catch (error) {
    console.error('Error in /on_subscribe:', error);
    return res.status(500).json({
      message: 'Failed to process the challenge',
      error: error.message
    });
  }
});

module.exports = router;
