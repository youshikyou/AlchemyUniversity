import { useState } from 'react';

function Accounts({ alchemy }) {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState(null);

  async function getBalance() {
    const balance = await alchemy.core.getBalance(address);
    setBalance(balance.toString());
  }

  return (
    <div>
      <h2>Account Balance Lookup</h2>
      <input
        type="text"
        placeholder="Enter Ethereum Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={getBalance}>Get Balance</button>
      {balance && (
        <div>
          <h3>Balance</h3>
          <p>{balance} wei</p>
        </div>
      )}
    </div>
  );
}

export default Accounts;
