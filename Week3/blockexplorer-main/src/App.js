import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import Accounts from './Accounts';
import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [blockInfo, setBlockInfo] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [transaction, setTransactionInfo] = useState(null);

  useEffect(() => {
    async function fetchBlockNumber() {
      const currentBlockNumber = await alchemy.core.getBlockNumber();
      setBlockNumber(currentBlockNumber);
    }

    fetchBlockNumber();
  }, []);

  async function getBlockInfo(blockNumber) {
    const block = await alchemy.core.getBlock(blockNumber);
    setBlockInfo(block);
    setTransactions(null);
    setTransactionInfo(null); // Clear previous transaction info
  }

  async function getBlockTransactions(blockNumber) {
    const blockWithTxs = await alchemy.core.getBlockWithTransactions(blockNumber);
    setTransactions(blockWithTxs.transactions);
  }

  async function getTransactionInfo(txHash) {
    const tx = await alchemy.core.getTransactionReceipt(txHash);
    setTransactionInfo(tx);
  }

  return (
    <div className="App">
      <h1>Ethereum Block Explorer</h1>
      <div>
        <p>Current Block Number: {blockNumber}</p>
        <button onClick={() => getBlockInfo(blockNumber)}>Get Block Info</button>
        {blockInfo && (
          <div>
            <h2>Block Information</h2>
            <p>Block Number: {blockInfo.number}</p>
            <p>Block Hash: {blockInfo.hash}</p>
            <p>Parent Hash: {blockInfo.parentHash}</p>
            <p>Miner: {blockInfo.miner}</p>
            <p>Timestamp: {new Date(blockInfo.timestamp * 1000).toString()}</p>
            <p>Number of Transactions: {blockInfo.transactions.length}</p>
            <button onClick={() => getBlockTransactions(blockInfo.number)}>Get Transactions</button>
          </div>
        )}
        {transactions && (
          <div>
            <h2>Transactions</h2>
            {transactions.map((tx) => (
              <div key={tx.hash} onClick={() => getTransactionInfo(tx.hash)} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                <p>Transaction Hash: {tx.hash}</p>
              </div>
            ))}
          </div>
        )}
        {transaction && (
          <div>
            <h2>Transaction Information</h2>
            <p>Transaction Hash: {transaction.transactionHash}</p>
            <p>Block Hash: {transaction.blockHash}</p>
            <p>From: {transaction.from}</p>
            <p>To: {transaction.to}</p>
            <p>Gas Used: {transaction.gasUsed.toString()}</p>
          </div>
        )}
      </div>
      <Accounts alchemy={alchemy} />
    </div>
  );
}

export default App;
