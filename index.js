const k = require('keythereum')
const secp256k1 = require('secp256k1')
const { randomBytes, createHash } = require('crypto')
const sha256 = createHash('sha256')


module.exports = function generateKeys () {
  let secretKey
  do {
    secretKey = randomBytes(32)
  } while (!secp256k1.privateKeyVerify(secretKey))

  // get the public key in a compressed format
  return {
    secretKey,
    publicKey: secp256k1.publicKeyCreate(secretKey)
  }
}

// const alice = generateKeys()
// const bob = generateKeys()
//
// console.log('Alice secret key: ', alice.secretKey.toString('base64'))
// console.log('Alice public key: ', alice.publicKey.toString('base64'))
//
// console.log('Bob secret key: ', bob.secretKey.toString('base64'))
// console.log('Bob public key: ', bob.publicKey.toString('base64'))
//
// console.log('ecdh shared secret alicepk, bobsk ', secp256k1.ecdh(alice.publicKey, bob.secretKey).toString('base64'))
// console.log('ecdh shared secret bobpk, alicesk ', secp256k1.ecdh(bob.publicKey, alice.secretKey).toString('base64'))
//
//
// console.log('sha256(ecdhUnsafe), to demonstrate it is the same as ecdh: ', sha256.update(secp256k1.ecdhUnsafe(alice.publicKey, bob.secretKey)).digest().toString('base64'))
//
// console.log('ecdhUnsafe alicepk, bobsk: ', secp256k1.ecdhUnsafe(alice.publicKey, bob.secretKey).toString('base64'))
// console.log('ecdhUnsafe bobsk, alicepk: ', secp256k1.ecdhUnsafe(bob.publicKey, alice.secretKey).toString('base64'))
//
// console.log('Alice\'s Ethereum address: ', k.privateKeyToAddress(alice.secretKey))
// console.log('Bob\'s Ethereum address: ', k.privateKeyToAddress(bob.secretKey))
