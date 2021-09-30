const express = require('express');
const cors = require('cors')
const rotas = require('./routes/rotas');

/**
 * 
 */

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended:true }));
app.use(express.json());

app.use('/api/user', rotas.userRoute)
app.use('/api/tell', rotas.tellRoute)


module.exports = app;

