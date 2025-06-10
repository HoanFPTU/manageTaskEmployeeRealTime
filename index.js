const express = require('express');
const userRouter = require('./src/routers/user.router');

const app = express()
const port = 3000


const SECRET_KEY = process.env.SECRET_KEY;
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(userRouter)
// const {db} = require("./src/config/firebase");


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
