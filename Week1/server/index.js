const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0x9e0805dd0a39c552df210d0dc9cdac91f1018247": 100, //039f13ee215c044fdd6499d7b749dc2ecceaef8db2773586213740b0a687cdbea0
  "0x32965b2d5a4e07ecbef57fbd38ced10c64487c4a": 50, //0329373ff7b918ea2a4a756b74e66475636915128abe3f045fbd8c96998b77d7c1
  "0xfa645dc1b27d244bc945b77582ee984a67ebd2f9": 75,//029328aab689022fc288752ac179cf68483f4c1660fe292884c6f40a167a6dde64
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  console.log(`Received address: ${address}`);
  const balance = balances[address] || 66;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}