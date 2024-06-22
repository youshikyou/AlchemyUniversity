const axios = require('axios');

// copy-paste your URL provided in your Alchemy.com dashboard
const ALCHEMY_URL = "https://eth-sepolia.g.alchemy.com/v2/h5bomWsCgRG4xyiyqraWNlPM9OEocIyv";

axios.post(ALCHEMY_URL, {
  jsonrpc: "2.0",
  id: 1,
  params: [
    "0xe5cB067E90D5Cd1F8052B83562Ae670bA4A211a8",
    "latest"
  ],
  method: "eth_getBalance"
}).then((response) => {
  console.log(response.data.result);
});

// axios.post(ALCHEMY_URL, {
//     jsonrpc: "2.0",
//     id: 1,
//     method: "eth_getBlockByNumber",
//     params: [
//       "0xb443", // block 46147
//       true  // retrieve the full transaction object in transactions array
//     ]
//   }).then((response) => {
//     console.log(response.data.result);
//   })