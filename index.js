const express = require('express');
const cors = require('cors')

const app = express();

app.use(cors());

const userRoute = require('./routes/user');

app.use(express.urlencoded({ extended:false }));
app.use(express.json());

app.use('/user', userRoute)


module.exports = app;

