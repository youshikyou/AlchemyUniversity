const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const privateKey = secp256k1.utils.randomPrivateKey();
console.log("Private key:", toHex(privateKey));

const publicKey = secp256k1.getPublicKey(privateKey,true);
console.log("Public key:", toHex(publicKey))
// Derive the address from the public key
const address = toHex(keccak256(publicKey.slice(1)).slice(-20));
console.log("Address:", address);

// Save public key and address in your user database
