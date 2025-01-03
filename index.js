const express = require('express');
const cors = require('cors');
const { userRouter } = require('./routers/users');
const { run } = require('./db/mongodb');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
    res.send('Bank server is running!!!');
})

app.use('/users', userRouter);

app.listen(port, async()=>{
    console.log(`Server is running on port ${port}`);
    await run;
})