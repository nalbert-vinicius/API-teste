const jwt = require('jsonwebtoken');

module.exports = (req, res, next) =>{
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, process.env.JWT_KEY);
        var user = {
            id_usuario: decode.id_usuario,
            nickname: decode.nickname,
            nome: req.body.nome
        }
    next();
    }catch(err){
        return res.status(401).send({
            msg: "Token authentication failed - JWT",
            Ok: false
        })
    }
    
}