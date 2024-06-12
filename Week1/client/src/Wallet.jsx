import server from "./server";
import { recoverPublicKey ,utils} from "@noble/secp256k1";
import { utf8ToBytes,toHex,hexToBytes } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";

function Wallet({ signature, setSignature, balance, setBalance, address, setAddress}) {
  async function onChange(evt) {

    const signatureInput = evt.target.value;
    setSignature(signatureInput);

    const message = "Transfer";
    const msgHash = keccak256(utf8ToBytes(message));
    

    // Recover the public key
    const publicKey = recoverPublicKey(msgHash, signatureInput, 1, true); 
    console.log(toHex(publicKey));


    const address = `0x${toHex(keccak256(publicKey.slice(1)).slice(-20))}`;
    console.log(address)

    setAddress(address);

    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      console.log(`Server response: ${balance}`)
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Signature
        <input placeholder="Type an signature" value={signature} onChange={onChange}></input>
      </label>

      <label>
        Address: {address}
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;