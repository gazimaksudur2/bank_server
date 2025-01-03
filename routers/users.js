const express = require("express");
const { client } = require("../db/mongodb");
const router = express.Router();

const usersCollection = client.db("bank").collection("users");

router
  .get("/", async (req, res) => {
    const result = await usersCollection.find().toArray();
    res.send(result);
  })
  .post("/", async (req, res) => {
    const { name, email, password } = req.body;
    const user = { name, email, password };
    const result = await usersCollection.insertOne(user);
    // console.log(result);
    res.send(result);
  });

module.exports = {
  userRouter: router,
};