const mongoose = require("mongoose");
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")
require("../models/FormaPagamento")
const FormaPagamento = mongoose.model("formaPagamento")
require("../models/Carrinho")
const Carrinho = mongoose.model("carrinhos")
require("../models/Produto")
const Produto = mongoose.model("produtos")
require("../models/Pedido")
const Pedido = mongoose.model("pedidos")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const add = (req, res) =>{

    const {nome, sobrenome, email, cpf, senha, dataNascimento} = req.body.usuario
    
        
    Usuario.findOne({cpf: cpf}).then((usuario)=>{

        if(usuario){
            return  res.status(400).send("CPF existente no Banco de Dados, verifique e tente novamente!")
        }else{
            const salt = bcrypt.genSaltSync(12);
            const cryptSenha = bcrypt.hashSync(senha, salt)

             const novoUsuario = new Usuario({
                  nome:  nome,
                  sobrenome: sobrenome,
                  email: email,
                  cpf: cpf,
                  dataNascimento: dataNascimento,
                  senha: cryptSenha                  
            })

            novoUsuario.save().then((usuario)=>{
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

const search = (req, res)=>{
    
    const {cpf} = req.params
    
    Usuario.findOne({cpf: cpf}).then((usuario) =>{

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

const update = (req, res) =>{
    
    const {_id, nome, sobrenome, email, cpf, senha, dataNascimento} = req.body.usuario

    Usuario.findOne({_id: _id}).then((usuario)=>{
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

const deleteUser = (req, res)=>{

    const {_id} = req.params
    
    Usuario.deleteOne({_id: _id}).then((usuario)=>{
        res.status(200).send({message: "Usuário deletado com sucesso!"});
    }).catch((err)=>{
        res.status(500).send("Houve um erro ao excluir Provedor no Banco de Dados!")
    })
}

const login = (req, res)=>{

    const {cpf, senha} = req.body.usuario

    Usuario.findOne({cpf: cpf}).then((usuario)=>{
        if(!usuario){
           return res.status(400).send({message: "CPF não encontrado no Banco de Dados, verifique informações e tente novamente!"})
        }

        const matchPassword = bcrypt.compareSync(senha, usuario.senha) 
            if(!matchPassword){
                return res.status(400).send({message: "Senha incorreta, verifique e tente novamente!"})
            }else{
                const token =  jwt.sign({id: usuario._id, nome: usuario.nome, cpf: usuario.cpf}, process.env.TOKEN_SECRET, {expiresIn: 6000})

                res.status(200).send({message:"Usuário Logado!", token: token})
            }

    }).catch((err)=>{
        return res.status(400).send({
            message: "Houve um erro ao procurar usuário no Banco de Dados",
            error: err  
        })
    })
}

const allUser = (req, res)=>{
    
    Usuario.find().then((usuarios)=>{
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

const updateUserbyAdmin = (req, res)=>{
    
    const {_id, nome, sobrenome, email, cpf, dataNascimento} = req.body.usuario

    Usuario.findOne({_id: _id}).then((usuario)=>{
      
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

const addFormaPagamento = (req, res)=>{

    const {numeroCartao, nomeTitular, tipoCartao, cpfTitular, vencimentoCartao, codCartao} = req.body.formaPagamento
    const idUsuario = req.user.id

    FormaPagamento.findOne({numeroCartao: numeroCartao}).then(cartao=>{
        if(cartao){
            return  res.status(400).send("Número de Cartão existente no Banco de Dados, verifique e tente novamente!")
        }else{
            
             const novaFormaPagamento = new FormaPagamento({
                  numeroCartao:  numeroCartao,
                  nomeTitular: nomeTitular,
                  tipoCartao: tipoCartao,
                  cpfTitular: cpfTitular,
                  vencimentoCartao: vencimentoCartao,
                  codCartao: codCartao,
                  idUsuario: idUsuario
            })

            novaFormaPagamento.save().then((formaPagamento)=>{
                return  res.status(200).send({message:"Forma de Pagamento salva com sucesso!"})
            }).catch((err)=>{
                return res.status(400).send({
                    message: "Houve um erro ao salvar os dados da Forma de Pagamento!",
                    error: err
                    })
            })
        }
    }).catch((err)=>{
        return res.status(400).send({message:"Houve um erro na consulta de dados!",
                                    error: err})
    })


}

const searchAllFormaPagamento = (req, res)=>{

    const idUsuario = req.user.id

    FormaPagamento.find({idUsuario: idUsuario}).then(formaPagamento =>{
        
        return res.status(200).send({
            message: "Forma de Pagamento encontrada!",
            body: formaPagamento})
            
    }).catch((err) =>{
        return res.status(400).send({message: "Nenhuma Forma de Pagamento encontrada no Banco de Dados, verifique informações e tente novamente!"})
            
    })

}

const deleteFormaPagamento = (req, res)=>{

    const {id} = req.params

    FormaPagamento.deleteOne({_id: id}).then(formaPagamento =>{
        res.status(200).send({message: "Forma de Pagamento deletada com sucesso!"});
    }).catch((err)=>{
        res.status(500).send("Houve um erro ao excluir Forma de Pagamento no Banco de Dados!")
    })
}

const updateFormaPagamento = (req, res)=>{

    const {_id, numeroCartao, nomeTitular, tipoCartao, cpfTitular, vencimentoCartao, codCartao} = req.body.formaPagamento

    FormaPagamento.findOne({_id: _id}).then(formaPagamento=>{
        if(numeroCartao != formaPagamento.numeroCartao){
            formaPagamento.numeroCartao = numeroCartao
        }
        if(nomeTitular != formaPagamento.nomeTitular){
            formaPagamento.nomeTitular = nomeTitular
        }
        if(tipoCartao != formaPagamento.tipoCartao){
            formaPagamento.tipoCartao = tipoCartao
        }
        if(cpfTitular != formaPagamento.cpfTitular){
            formaPagamento.cpfTitular = cpfTitular
        }
        if(vencimentoCartao != formaPagamento.vencimentoCartao){
            formaPagamento.vencimentoCartao = vencimentoCartao
        }
        if(codCartao != formaPagamento.codCartao){
            formaPagamento.codCartao = codCartao
        }

        formaPagamento.save().then((formaPagamento)=>{
            return  res.status(200).send({message:"Forma de Pagamento salva com sucesso!"})
        }).catch((err)=>{
            return res.status(400).send({
                message:"Houve um erro ao salvar os dados da Forma de Pagamento!",
                error: err
            })
        })
    }).catch((err)=>{
        return res.status(400).send({
            message:"Houve um erro na consulta de dados!",
            error: err
        })
    })
}

const addCarrinho = (req, res)=>{

    const idUsuario = req.user.id

    Carrinho.findOne({idUsuario: idUsuario}).then((carrinho) =>{
        if(carrinho){
            return  res.status(200).send({
                message: "Carrinho Existente!",
                body: carrinho
            })
        }else{
             const novoCarrinho = new Carrinho({
                  idUsuario:  idUsuario,
                  valorTotal: 0,
            })

            novoCarrinho.save().then((carrinho)=>{
                return  res.status(200).send({
                    message:"Carrinho criado com sucesso!",
                    body: carrinho
                })
            }).catch((err)=>{
                return res.status(400).send({
                    message: "Houve um erro ao salvar os dados do Carrinho!",
                    error: err
                })
            })
        }
    }).catch((err)=>{
        return res.status(400).send({
            message:"Houve um erro na consulta de dados!",
            error: err
        })
    })
}

const searchCarrinho = (req, res)=>{

    const idUsuario = req.user.id

    Carrinho.findOne({idUsuario: idUsuario}).then((carrinho) =>{
             
            return res.status(200).send({
                message: "Carrinho encontrado!",
                body: carrinho
            })
       
        
    }).catch((err)=>{
        const novoCarrinho = new Carrinho({
            idUsuario:  idUsuario,
            valorTotal: 0,
        })

        novoCarrinho.save().then((carrinho)=>{
            return  res.status(200).send({
                message:"Carrinho criado com sucesso!",
                body: carrinho
            })
        }).catch((err)=>{
            return res.status(400).send({
                message: "Houve um erro ao salvar os dados do Carrinho!",
                error: err
            })
        })
    })
}

const addProdutoCarrinho = (req, res) =>{

    const {idProduto, qtd} = req.body.produto
    const idUsuario = req.user.id
    

    if(qtd > Number(process.env.QTD_CARRINHO)){
        return res.status(400).send({
            message:"Limite de quantidade de produto excedida!"
        })
    }

    Produto.findOne({_id: idProduto}).then((produto)=>{
        const estoqueSeguranca = produto.estoque - process.env.ESTOQUE_SEGURANCA

            if(estoqueSeguranca <= 0){
                return res.status(400).send({
                    message:"Produto sem estoque disponível para venda!"
                })
            }
            if(qtd > estoqueSeguranca){
                return res.status(400).send({
                    message:"Quantidade solicitada é maior do que a disponível para venda!"
                })
            }

            Carrinho.findOne({idUsuario: idUsuario}).then((carrinho)=>{
                var quantidade = 0
                carrinho.itens.map(value =>{
                    quantidade += value.qtd
                })

                if(quantidade > Number(process.env.QTD_CARRINHO)){
                        
                    return res.status(400).send({
                        message:"Limite de quantidade de produtos excedida!"
                    })
                }

                carrinho.itens.push({
                    _id: carrinho.itens.length+1,
                    nomeProduto: produto.nome,
                    idProduto: idProduto,
                    valor: produto.valor,
                    qtd: qtd,
                    totalProduto: qtd * produto.valor
                })
                                    
                let valorTotal = 0

                carrinho.itens.map((value) =>{
                        valorTotal += value.totalProduto   
                })
                carrinho.valorTotal = valorTotal
                
                carrinho.save().then((carrinho)=>{
                    return  res.status(200).send({
                        message:"Item incluído com sucesso!",
                        body: carrinho
                    })
                }).catch((err)=>{
                    return res.status(400).send({
                        message:"Houve um erro ao incluir Item no carrinho!",
                        error: err
                    })
                })
            }).catch((err)=>{
                return res.status(400).send({
                    message:"Houve um erro na consulta de dados do Carrinho!",
                    error: err
                })
            })

            produto.estoque -= qtd

            produto.save()
    }).catch((err)=>{
        return res.status(400).send({
            message:"Produto não encontrado!",
            error: err
        })
    })
}

const deleteProdutoCarrinho = (req, res)=>{
    const idUsuario = req.user.id
    const {idItem} = req.params

    Carrinho.findOne({idUsuario: idUsuario}).then(carrinho=>{          

            if(carrinho.itens.length > 0){
                var index = null, qtd = 0 , idProduto = null
                carrinho.itens.map((value, i)=>{
                    if(value._id == idItem){
                        index = i
                        qtd = value.qtd
                        idProduto = value.idProduto
                    }   
                })
                if(idProduto){
                    attEstoque(qtd, idProduto)

                    carrinho.itens.splice(index,1)
                        
                    carrinho.itens.map((value, index)=>{
                        value._id = index+1
                    })
    
                    let valorTotal = 0
    
                    carrinho.itens.map((value) =>{
                        valorTotal += value.totalProduto   
                    })
                    carrinho.valorTotal = valorTotal
                    
                }else{
                    return res.status(400).send({
                        message:"Item não encontrado!"
                    })
                }
               
                carrinho.save().then((carrinho)=>{
                    
                    return  res.status(200).send({
                        message:"Item removido com sucesso!",
                        body: carrinho
                    })
                }).catch((err)=>{
                    return res.status(400).send({
                        message:"Houve um erro ao excluir Item no carrinho!",
                        error: err
                    })
                })
        }else{
            return res.status(400).send({
                message:"Carrinho vazio!"
            })
        }
    }).catch((err)=>{
        console.log(err)
        return res.status(400).send({
            message:"Houve um erro na consulta de dados do Carrinho!",
            error: err
        })
    })
}

const attEstoque = (qtd, idProduto)=>{
    Produto.findOne({_id: idProduto}).then(produto=>{
        produto.estoque += qtd

        produto.save().then((produto)=>{
        }).catch((err)=>{
            return res.status(400).send({
                message:"Houve um erro ao atualizar dados do Produto!",
                error: err
            })
        })
    }).catch((err)=>{
        return res.status(400).send({
            message:"Houve um erro na atualização de dados do Produto!",
            error: err
        })
    })
}

const alterarQtdProdutoCarrinho = (req, res)=>{
    const idUsuario = req.user.id
    const {idItem, idProduto, qtd} = req.body.produto

    Produto.findOne({_id: idProduto}).then((produto)=>{
        Carrinho.findOne({idUsuario: idUsuario}).then(carrinho=>{

            if(carrinho.itens.length > 0){
                carrinho.itens.map((value)=>{
                    if(value._id == idItem){
                        value.qtd = qtd
                        value.totalProduto = produto.valor * qtd
                    }    
                })

                let valorTotal = 0

                carrinho.itens.map((value) =>{
                    valorTotal += value.totalProduto   
                })
                carrinho.valorTotal = valorTotal
                
                carrinho.save().then((carrinho)=>{
                    return  res.status(200).send({
                        message:"Quantidade alterada com sucesso!",
                        body: carrinho
                    })
                })
            }
            if(carrinho.itens.length == 0){
                     
                carrinho.itens.push({
                    _id: itens.length+1,
                    idProduto: idProduto,
                    valor: produto.valor,
                    qtd: qtd,
                    totalProduto: qtd * produto.valor
                })
            
                let valorTotal = 0

                carrinho.itens.map((value) =>{
                    valorTotal += value.totalProduto   
                })
                carrinho.valorTotal = valorTotal
                
                carrinho.save().then((carrinho)=>{
                    return  res.status(200).send({
                        message:"Item incluído com sucesso!",
                        body: carrinho
                    })
                })
            }
        }).catch((err)=>{
            return res.status(400).send({
                message:"Houve um erro na consulta de dados do Carrinho!",
                error: err
            })
        })
    }).catch((err)=>{
        return res.status(400).send({
            message:"Houve um erro na consulta de dados do Produto!",
            error: err
        })
    })
}

const addPedido = (req, res)=>{
    const idUsuario = req.user.id
    const {cpfCliente, endEntrega, formaPagamento} = req.body.pedido

    Carrinho.findOne({idUsuario: idUsuario}).then((carrinho)=>{
        if(carrinho.itens.length > 0){
            const novoPedido = new Pedido({
                idUsuario: idUsuario,
                itens: carrinho.itens,
                valorTotal: carrinho.valorTotal,
                cpfCliente: cpfCliente,
                formaPagamento: formaPagamento,
                endEntrega: endEntrega,
                status: "Concluído"
            })

            novoPedido.save().then((pedido)=>{

                carrinho.itens = null
                carrinho.valorTotal = 0
                carrinho.save()

                return  res.status(200).send({
                    message:"Pedido criado com sucesso!",
                    body: pedido
                })
            }).catch((err)=>{
                return res.status(400).send({
                    message:"Houve um erro na criação do Pedido!",
                    error: err
                })
            })           
        }
    }).catch((err)=>{
        return res.status(400).send({
            message:"Houve um erro na consulta de Itens do Pedido!",
            error: err
        })
    })
}

const allPedido = (req, res)=>{

    const idUsuario = req.user.id

    Pedido.find({idUsuario: idUsuario}).then((pedidos)=>{
        if(pedidos.length == 0){
            return  res.status(400).send({
                message:"Não há pedidos feitos pelo Usuário!"
            })
        }
        if(pedidos.length > 0){
            return  res.status(200).send({
                message:"Pedido encontrados!",
                body: pedidos
            })
        }
    }).catch(err=>{
        return  res.status(500).send({
            message:"Houve um erro ao buscar Pedidos!",
            error: err
        })
    })

}

const searchPedido = (req, res)=>{

    const {idPedido} = req.params
    
    Pedido.findOne({_id: idPedido}).then(pedido=>{
            return res.status(200).send({
                message: "Pedido encontrado!",
                body: pedido
            })
    }).catch(err=>{
        return  res.status(500).send({
            message:"Pedido não encontrado!",
            error: err
        })
    })
}

const cancelPedido = (req, res)=>{

    const {idPedido} = req.params

    Pedido.findOne({_id: idPedido}).then(pedido=>{
        pedido.status = "Cancelado"

        pedido.save().then((pedido)=>{
            return  res.status(200).send({
                message:"Pedido cancelado com sucesso!",
                body: pedido
            })
        }).catch((err)=>{
            return res.status(400).send({
                message:"Houve um erro no cancelamento do Pedido!",
                error: err
            })
        })
    }).catch((err)=>{
        return res.status(400).send({
            message:"Pedido não encontrado!",
            error: err
        })
    })
}


module.exports = { add, search, update, deleteUser, login, allUser, updateUserbyAdmin, addFormaPagamento, searchAllFormaPagamento, deleteFormaPagamento, updateFormaPagamento, addCarrinho, searchCarrinho, addProdutoCarrinho, deleteProdutoCarrinho, alterarQtdProdutoCarrinho, addPedido, allPedido, searchPedido, cancelPedido }