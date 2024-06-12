const { sign } = require("@noble/secp256k1");
const { utf8ToBytes, toHex, hexToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const privateKeys = [
    '0x3b229be61d8b3280e6b42f3f0d4cabcef61e2b1ba95e389f6e142905af7370da',
    '0x7994954f345f8b010909d42812f9cee7745a4857e0abc5c8ae2dd9be6f24a2d4',
    '0x80be5bbbb65673cac667e58da78f6d2788a2f5838fd4be51f82a24cfe56555e6'
];

async function signMessage(msg, privateKey) {
    const msgHash = keccak256(utf8ToBytes(msg));
    const privateKeyhex = privateKey.slice(2);
    const [signature, recovery] = await sign(msgHash, privateKeyhex, { recovered: true });
    return {
        signature: signature,
        hexsignature: toHex(signature),
        recovery
    };
}

const privateKey = privateKeys[1];

const message = "Transfer";

signMessage(message, privateKey)
    .then(signature_msg => {
        console.log("Signature:", signature_msg);
    })
    .catch(console.error);
       