const crypto = require('crypto');

function decryptChallenge(encryptedChallenge, privateKey, publicKey) {
  const buffer = Buffer.from(encryptedChallenge, 'base64');
  
  try {
    const decryptedBuffer = crypto.privateDecrypt(
      {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_PADDING, // Depends on how ONDC encrypts it; adjust if needed
      },
      buffer
    );
    
    return decryptedBuffer.toString('utf8');
  } catch (err) {
    throw new Error('Failed to decrypt challenge');
  }
}

module.exports = { decryptChallenge };
