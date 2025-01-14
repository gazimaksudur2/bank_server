const express = require("express");
const { client } = require("../db/mongodb");
const router = express.Router();

const usersCollection = client.db("bank").collection("users");

function generateAccountNumber() {
  const timestamp = Date.now().toString(); // Current time in milliseconds
  const randomDigits = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0"); // Random 3 digits
  return (timestamp.slice(-9) + randomDigits).padStart(12, "0"); // Ensures 12 digits
}

router
  .get("/", async (req, res) => {
    const email = req.query?.email;
    let result;
    if (email) {
      result = await usersCollection.findOne({ email });
    } else result = await usersCollection.find().toArray();
    res.send(result);
  })
  .post("/", async (req, res) => {
    // const { username, email, password } = req.body;
    const users = await usersCollection
      .find({ email: req.body.email })
      .toArray();
    let result = { exists: true };
    if (users.length == 0) {
      result = await usersCollection.insertOne({ ...req.body });
    }
    res.send(result);
  });

module.exports = {
  userRouter: router,
};
