const db = require('../database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Inserir usuário
exports.insertUser = async (req, res, next) => {
    try{

        const cliente = await db.query('select * from clientes where cpf = $1 or nickname = $2',[req.body.cpf, req.body.nickname])
        if(cliente.rowCount == 0 ){
            const hash = bcrypt.hashSync(req.body.senha, 10)
            await db.query('INSERT INTO clientes (nome, nickname, senha, cpf, data_nasc) VALUES ($1, $2, $3, $4, $5)',
            [req.body.nome,req.body.nickname ,hash, req.body.cpf, req.body.data_nasc]);    
    
            res.status(201).send({
                sucess: true,
                message: "Registro criado com sucesso!",
            })   
        }else{
            if(cliente.rows[0].cpf == req.body.cpf){
                res.status(401).send({
                    message: "This cpf already exists in the database, try again",
                    sucess: false
                })
            }else{
                res.status(401).send({
                    message: "This nickname already exists in the database, try again",
                    sucess: false
                })
            }
            
        }

        
    }catch(error){
        return res.status(500).send({
            msg: "Error registering!",
            Ok: false,
            error: error
       })
    }
}

// Update usuário
exports.updateUser = async (req, res, next) =>{
    try{
        const hash = bcrypt.hashSync(req.body.senha, 10);
        const response = await db.query('UPDATE clientes SET nome=$1, nickname=$2, senha=$3, cpf=$4, data_nasc=$5 WHERE idcliente=$6',
        [req.body.nome, req.body.nickname ,hash, req.body.cpf, req.body.data_nasc, req.params.id]);

        if(response.rowCount == 1){
            return res.status(200).send({
                sucess: true,
                message: "Customer updated successfully!"
            })
        }else{
            return res.status(400).send({
                sucess: false,
                message: "Error updating!"
            })
        }
    }catch(error){
        return res.status(500).send({
            message: "Error updating!",
            Ok: false,
            error: error
       })
    }
}

// Deletar usuário
exports.deleteUser = async (req, res, next) =>{
    try{
        const response = await db.query('DELETE FROM clientes WHERE idcliente = $1',[req.params.id])
        if(response.rowCount == 1){
            return res.status(200).send({
                sucess: true,
                message: "User deleted successfully!"
            })
        }else{
            return res.status(400).send({
                sucess: false,
                message: "Error deleting user!"
            })
        }
    }catch(error){
        return res.status(501).send({
            msg: "Error deleting!",
            Ok: false,
            err: error
        })
    }
}

// Trazer todos os usuários
exports.getUser = async (req, res, next) => {
    try{
        const response = await db.query('SELECT * FROM clientes')
        res.status(200).send({
            sucess: true,
            users: response.rows
        })
    }catch(error){
        return res.status(500).send({
            message: "Error when fetching data!",
            sucess: false,
            error: error
       })
    }
}

// Login de usuários
exports.login = async (req, res, next) =>{
    try{
        const user = await db.query("SELECT * FROM clientes WHERE nickname=$1",
        [req.body.nickname])
        if(user.rowCount == 1 && await bcrypt.compareSync(req.body.senha, user.rows[0].senha)){
            const token = jwt.sign({
                id_usuario: user.rows[0].idcliente,
                nickname: user.rows[0].nickname
            },process.env.JWT_KEY,{
                expiresIn: "1h"
            });

            return res.status(200).send({
                message: "Successfully authenticated!",
                sucess: true,
                Name: user.rows[0].nome,
                token: token,
            }); 
        }
        return res.status(401).send({ message: 'Authentication failure, password or incorrect user!' })

    }catch(error){
        return res.status(500).send({ message: 'authentication failed' });
    }
}

exports.validade = async (req, res, next) =>{
    try{
        const response = await db.query('select * from clientes where nickname=$1',[req.body.user.nickname])
        return res.status(200).send({
            message: "Token valid!",
            sucess: true,
            nome: response.rows[0].nome
        })
    }catch(error){
        return res.status(500).send({ error: error });
    }
}
