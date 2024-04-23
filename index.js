
require("dotenv").config();
const express = require("express");

const router = require('./src/router');

const port = process.env.PORT;

const app = express();

const cors = require('cors')
app.use(cors())

app.use(express.json());

app.listen(port, ()=>{
    console.log("aplicação funcionando")
})

app.use('/',router);
