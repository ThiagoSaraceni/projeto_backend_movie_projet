require("dotenv").config();
const express = require("express");

const app = express();

const userRouter = require('./rotasuser');
const fimesRouter = require('./filmes');

app.use('/',userRouter);
app.use('/',fimesRouter);

module.exports = app