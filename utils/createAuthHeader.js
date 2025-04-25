// Create Authorization Header
const { hashMessage } = require('./hash');
const { createSigningString } = require('./signingString');
const { signMessage } = require('./sign');

function createAuthorizationHeader(body, privateKey, subscriberId, keyId) {
  const created = Math.floor(Date.now() / 1000);
  const expires = created + 300;
  const digest = hashMessage(body);
  const signingString = createSigningString(digest, created, expires);
  const signature = signMessage(signingString, privateKey);

  const header = `Signature keyId="${subscriberId}|${keyId}|ed25519",algorithm="ed25519",created="${created}",expires="${expires}",headers="(created) (expires) digest",signature="${signature}"`;
  return header;
}

module.exports = { createAuthorizationHeader };
