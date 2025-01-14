const express = require("express");
const { client } = require("../db/mongodb");
const router = express.Router();


const transactionsCollection = client.db('bank').collection('transactions');
const usersCollection = client.db("bank").collection("users");

router
    .get('/', async (req, res) => {
        let result = {success: true};
        if(req.query?.email){
            const user_account = await usersCollection.findOne({email: req.query?.email})
            result = await transactionsCollection
              .find({
                $or: [
                  { sender: user_account?.accountInfo?.account_no },
                  { receiver: user_account?.accountInfo?.account_no },
                ],
              })
              .toArray();

        }else result = await transactionsCollection.find().toArray();
        res.json(result);
    })


module.exports = {
    transactionRouter: router
}