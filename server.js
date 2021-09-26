require('dotenv').config();
const http = require('http');
const app = require('./app.js')

const server = http.createServer(app);

server.listen(process.env.PORT, () =>{
    console.log("Servidor rodando na porta ", process.env.PORT);
})
