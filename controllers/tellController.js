const db = require('../database');

exports.insertFone = async (req, res, next) =>{
    try{
        const userTell = await db.query('select * from telefone where idcliente=$1 and telefone=$2', 
        [req.body.idcliente, req.body.telefone]);
    
        if(userTell.rowCount == 0){
            await db.query('insert into telefone (idcliente, telefone) values ($1, $2)',
            [req.body.idcliente, req.body.telefone]);
    
            res.status(201).send({
                sucess: true,
                message: "successfully created!"
            })
        }else{
            res.status(401).send({
                sucess: false,
                message: "Error saving!"
            })
        }
    }catch(error){
        return res.status(500).send({
            msg: "Error registering!",
            Ok: false,
            error: error
       })
    }
}

exports.updateTell = async (req, res, next) =>{
    try{
        const response = await db.query('update telefone set idcliente=$1, telefone=$2 where idcliente=$3 and idtelefone=$4',
        [req.body.idcliente, req.body.telefone, req.body.idcliente, req.params.id])

        if(response.rowCount == 1){
            return res.status(200).send({
                sucess: true,
                message: "Tell updated successfully!"
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

exports.deleteTell = async (req, res, next) =>{
    try{
        const response = await db.query('delete from telefone where idtelefone=$1', [req.params.id])
        if(response.rowCount == 1){
            return res.status(200).send({
                sucess: true,
                message: "Tell deleted successfully!"
            })
        }else{
            return res.status(400).send({
                sucess: false,
                message: "Error deleting tell!"
            })
        }

    }catch(error){
        return res.status(501).send({
            message: "Error deleting!",
            sucess: false,
            err: error
        })
    }
}

exports.getTell = async (req, res, next) =>{
    try{
        const response = await db.query('select * from telefone where idcliente = $1',[req.body.idcliente]);
        if(response.rowCount > 0){
            return res.status(200).send({
                sucess: true,
                tell: response.rows
            })
        }
    }catch(error){
        return res.status(500).send({
            message: "Error when fetching data!",
            sucess: false,
            error: error
       })
    }
}
