const jwt = require("jsonwebtoken")

const authUser = (req, res, next)=>{

    const token = req.header("token");

    if(!token) return res.status(401).send({message:"Acesso negado, necessário login!"})

    try {
        const userVerified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = userVerified
        next()
    } catch (error) {

        if(error.message === "jwt expired"){
            return res.status(402).send({message: "Acesso Expirado, faça o login novamente!"})
        }
        return res.status(401).send({
            message:"Acesso Negado",
            error: error
        })
    }
}


const authAdmin = (req, res, next)=>{

    const token = req.header("token");

    if(!token) return res.status(401).send({message:"Acesso negado, necessário login!"})

    try {
        const userVerified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = userVerified
        
        if(req.user.admin){
            next()
        }else{
            return res.status(402).send({message: "Usuário não é Admin!"})
        }
        
    } catch (error) {
        if(error.message === "jwt expired"){
            return res.status(402).send({message: "Acesso Expirado, faça o login novamente!"})
        }
        return res.status(401).send({
            message:"Acesso Negado",
            error: error
        })
    }
}

module.exports = { authUser, authAdmin}