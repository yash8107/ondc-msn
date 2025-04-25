const nacl = require('tweetnacl');
const bs64 = require('bs64');

function generateKeyPair() {
  const keyPair = nacl.sign.keyPair();
  const publicKey = Buffer.from(keyPair.publicKey).toString('base64');
  const privateKey = Buffer.from(keyPair.secretKey).toString('base64');
  return { publicKey, privateKey };
}

// Example usage
const keys = generateKeyPair();
console.log('PRIVATE_KEY=', keys.privateKey);
console.log('PUBLIC_KEY =', keys.publicKey);
