// Verify Authorization Header
const nacl = require('tweetnacl');
const { createSigningString } = require('./signingString');
const { hashMessage } = require('./hash');

function parseAuthHeader(header) {
  const params = {};
  header.replace('Signature ', '').split(',').forEach(kv => {
    const [key, value] = kv.split('=');
    params[key.trim()] = value.replace(/"/g, '');
  });
  return params;
}

function verifyAuthorizationHeader(authHeader, body, senderPublicKey) {
  const params = parseAuthHeader(authHeader);
  const now = Math.floor(Date.now() / 1000);

  if (!(params.created <= now && now <= params.expires)) return false;

  const digest = hashMessage(body);
  const signingString = createSigningString(digest, params.created, params.expires);
  const publicKey = Buffer.from(senderPublicKey, 'base64');
  const signature = Buffer.from(params.signature, 'base64');

  return nacl.sign.detached.verify(
    Buffer.from(signingString),
    signature,
    publicKey
  );
}

module.exports = { verifyAuthorizationHeader };
