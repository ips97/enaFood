const mongoose = require("mongoose");
require("../models/Admin")
const Admin = mongoose.model("usuariosAdmin")
require("../models/Produto")
const Produto = mongoose.model("produtos")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// AdminModel
const addAdmin = (req, res)=>{

    const {nome, sobrenome, email, cpf, senha, dataNascimento} = req.body.usuario
    
        
    Admin.findOne({cpf: cpf}).then((usuario)=>{

        if(usuario){
            return  res.status(400).send("CPF existente no Banco de Dados, verifique e tente novamente!")
        }else{
            const salt = bcrypt.genSaltSync(12);
            const cryptSenha = bcrypt.hashSync(senha, salt)

             const novoAdmin = new Admin({
                  nome:  nome,
                  sobrenome: sobrenome,
                  email: email,
                  cpf: cpf,
                  dataNascimento: dataNascimento,
                  senha: cryptSenha                  
            })

            novoAdmin.save().then((usuario)=>{
                return  res.status(200).send({message:"Usuário salvo com sucesso!"})
            }).catch((err)=>{
                return res.status(400).send({message: "Houve um erro ao salvar os dados do usuário!",
                                            error: err})
            })
        }
    }).catch((err)=>{
        return res.status(400).send({message:"Houve um erro na consulta de dados!",
                                    error: err})
    })
}

const loginAdmin = (req, res)=>{

    const {cpf, senha} = req.body.usuario

    Admin.findOne({cpf: cpf}).then((usuario)=>{
        if(!usuario){
           return res.status(400).send({message: "CPF não encontrado no Banco de Dados, verifique informações e tente novamente!"})
        }

        const matchPassword = bcrypt.compareSync(senha, usuario.senha) 
            if(!matchPassword){
                return res.status(400).send({message: "Senha incorreta, verifique e tente novamente!"})
            }else{
                const token =  jwt.sign({id: usuario._id, nome: usuario.nome, admin: true, cpf: usuario.cpf}, process.env.TOKEN_SECRET, {expiresIn: 6000})

                res.status(200).send({message:"Usuário Logado!", token: token})
            }

    }).catch((err)=>{
        return res.status(400).send("Houve um erro ao procurar usuário no Banco de Dados")
    })
}

const searchAdmin = (req, res)=>{
    
    const {cpf} = req.params
    
    Admin.findOne({cpf: cpf}).then((usuario) =>{

        if(!usuario){
            return res.status(400).send({message: "CPF não encontrado no Banco de Dados, verifique informações e tente novamente!"})
        }
        
        return res.status(200).send({
            message: "Usuário encontrado!",
            body: usuario})
            
    }).catch((err) =>{
        return res.status(400).send({
            message: "Houve um erro ao procurar usuário no Banco de Dados",
            error: err})
            
    })
}

const updateAdmin = (req, res) =>{
    
    const {_id, nome, sobrenome, email, senha, dataNascimento} = req.body.usuario

    Admin.findOne({_id: _id}).then((usuario)=>{
        if(senha != usuario.senha){
            const salt = bcrypt.genSaltSync(12);
            const cryptSenha = bcrypt.hashSync(senha, salt)
            usuario.senha = cryptSenha
        }

        if(nome != usuario.nome){
            usuario.nome = nome
        }
        if(email != usuario.email){
            usuario.email = email
        }

        if(sobrenome != usuario.sobrenome){
            usuario.
            sobrenome = sobrenome  
        }
        if(dataNascimento != usuario.dataNascimento){
            usuario.dataNascimento = dataNascimento
        }

        usuario.save().then((usuario)=>{
            return  res.status(200).send({message:"Usuário salvo com sucesso!"})
        }).catch((err)=>{
            return res.status(400).send({
                message:"Houve um erro ao salvar os dados do usuário!",
                error: err
            })
        })
    })

}

const deleteAdmin = (req, res)=>{

    const {_id} = req.params
    
    Admin.deleteOne({_id: _id}).then((usuarios)=>{
        res.status(200).send({
            message: "Usuário deletado com sucesso!"});
    }).catch((err)=>{
        res.status(500).send("Houve um erro ao excluir Provedor no Banco de Dados!")
    })
}

const allAdmin = (req, res)=>{
    Admin.find().then((usuarios)=>{
        res.status(200).send({
            message: "Usuários consultados",
            body: usuarios
        });
    }).catch((err)=>{
        res.status(500).send({
            message: "Houve um erro ao procurar Usuários no Banco de Dados!",
            error: err
        })
    })
}

// ProdutoModel
const addProduto = (req, res)=>{

    const {nome, codBarra, categoria, valor} = req.body.produto

    Produto.findOne({codBarra: codBarra}).then(produto=>{
        if(produto){
            return  res.status(400).send("Código de Barra existente no Banco de Dados, verifique e tente novamente!")
        }else{
            const novoProduto = new Produto({
                nome:  nome,
                codBarra: codBarra,
                categoria: categoria,
                valor: valor
                    
          })

          novoProduto.save().then((produto)=>{
              return  res.status(200).send({message:"Produto salvo com sucesso!"})
          }).catch((err)=>{
              return res.status(400).send({message: "Houve um erro ao salvar os dados do produto!",
                                          error: err})
          })
        }
    })


}

const searchProduto = (req, res)=>{

    const {codBarra} = req.params
    
    Produto.findOne({codBarra: codBarra}).then((produto) =>{

        if(!produto){
            return res.status(400).send({message: "Produto não encontrado no Banco de Dados, verifique código e tente novamente!"})
        }
        
        return res.status(200).send({
            message: "Produto encontrado!",
            body: produto})
            
    }).catch((err) =>{
        return res.status(400).send({
            message: "Houve um erro ao procurar Produto no Banco de Dados",
            error: err})
            
    })
}

const deleteProduto = (req, res)=>{

    const {_id} = req.params
    
    Produto.deleteOne({_id: _id}).then((produto)=>{
        res.status(200).send({
            message: "Produto deletado com sucesso!"});
    }).catch((err)=>{
        res.status(500).send("Houve um erro ao excluir Provedor no Banco de Dados!")
    })
}

const updateProduto = (req, res)=>{

    const {nome, codBarra, categoria, valor} = req.body.produto

    Produto.findOne({codBarra: codBarra}).then(produto =>{
        if(nome != produto.nome){
            produto.nome = nome
        }
        if(categoria != produto.categoria){
            produto.categoria = categoria
        }
        if(valor != produto.valor){
            produto.valor = valor
        }

        
        produto.save().then((produto)=>{
            return  res.status(200).send({message:"Produto salvo com sucesso!"})
        }).catch((err)=>{
            return res.status(400).send({
                message:"Houve um erro ao salvar os dados do produto!",
                error: err
            })
        })
    })


}

const allProduto = (req, res)=>{
    Produto.find().then((produtos)=>{
        res.status(200).send({
            message: "Produtos consultados",
            body: produtos
        });
    }).catch((err)=>{
        res.status(500).send({
            message: "Houve um erro ao procurar Produtos no Banco de Dados!",
            error: err
        })
    })
}






module.exports = { addAdmin, loginAdmin, searchAdmin, updateAdmin, deleteAdmin, allAdmin, addProduto, searchProduto, deleteProduto, updateProduto, allProduto }