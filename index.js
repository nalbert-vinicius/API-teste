const express = require('express');
const cors = require('cors')
const rotas = require('./routes/rotas');

/**
 * 
 */


const app = express();

app.use(cors());

app.use(express.urlencoded({ extended:false }));
app.use(express.json());

app.use('/user', rotas.userRoute)


module.exports = app;

