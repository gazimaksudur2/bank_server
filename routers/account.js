const express = require("express");
const { client } = require("../db/mongodb");
const router = express.Router();

const usersCollection = client.db("bank").collection("users");
const transactionsCollection = client.db("bank").collection("transactions");

function generateAccountNumber() {
  const timestamp = Date.now().toString(); // Current time in milliseconds
  const randomDigits = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0"); // Random 3 digits
  return (timestamp.slice(-9) + randomDigits).padStart(12, "0"); // Ensures 12 digits
}

function generateTransactionID() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // Possible characters
  let transactionID = "";

  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    transactionID += chars[randomIndex];
  }

  return transactionID;
}

router
  .post("/setup", async (req, res) => {
    const email = req.body.email;
    const user = await usersCollection.findOne({ email });
    let account_no;
    while (true) {
      account_no = generateAccountNumber();
      const demo_user = await usersCollection.findOne({ account_no });
      if (demo_user == null) break;
    }
    // console.log(req.body, account_no);
    const result = await usersCollection.updateOne(
      { email },
      {
        $set: {
          accountInfo: {
            account_no,
            account_holder_name: req.body?.account_holder_name,
            security: req.body?.security,
            balance: 0,
            user_type: "general",
            account_setup_on: new Date(),
            account_status: "active",
          },
        },
      }
    );
    res.send(result);
  })
  .post("/credit", async (req, res) => {
    let txnID;
    while (true) {
      txnID = generateTransactionID();
      const demo_res = await transactionsCollection.findOne({ txnID });
      if (demo_res == null) break;
    }
    const result = await transactionsCollection.insertOne({
      txnID,
      txn_type: "credit_request",
      amount: req.body.amount,
      sender: "Easy Bank PVT LTD.",
      receiver: req.body.account_no,
      txn_date: new Date(),
      txn_status: "pending",
    });
    const user = await usersCollection.findOne({
      "accountInfo.account_no": req.body.account_no,
    });
    const result2 = await usersCollection.updateOne(
      { "accountInfo.account_no": req.body.account_no },
      {
        $set: {
          accountInfo: {
            ...user?.accountInfo,
            balance: parseFloat(
              parseFloat(user?.accountInfo.balance) +
                parseFloat(req.body.amount)
            ),
          },
        },
      }
    );
    res.send(result);
  })
  .post("/sendmoney", async (req, res) => {
    let txnID;
    while (true) {
      txnID = generateTransactionID();
      const demo_res = await transactionsCollection.findOne({ txnID });
      if (demo_res == null) break;
    }
    const values = req.body;
    const result = await transactionsCollection.insertOne({
      txnID,
      txn_type: "send_money",
      txn_status: "pending",
      amount: values.amount,
      sender: values.sender,
      receiver: values.receiver,
      txn_date: new Date(),
    });
  });

module.exports = {
  accountRouter: router,
};
