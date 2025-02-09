require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { userRouter } = require('./routers/users');
const { run } = require('./db/mongodb');
const { accountRouter } = require('./routers/account');
const { transactionRouter } = require('./routers/transactions');

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://easybank-b9b62.web.app",
      "https://ecommerce-26ce6.web.app", "*"
    ], // Specify the allowed origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);
app.use(express.json());

app.get('/', (req, res)=>{
    res.send('Bank server is running!!!');
})

app.use('/users', userRouter);
app.use('/account', accountRouter);
app.use('/transactions', transactionRouter);

app.listen(port, async()=>{
    console.log(`Server is running on port ${port}`);
    await run;
})