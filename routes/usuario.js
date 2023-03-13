const express = require("express")
const router = express.Router()
const auth = require("../config/auth")


// Controller
const usuario = require("../controllers/usuarioController")


// Routers UserModel
router.post("/add", usuario.add);
router.get("/:cpf", auth.authUser, usuario.search)
router.put("/update", auth.authUser, usuario.update)
router.delete("/:_id", auth.authUser, usuario.deleteUser)
router.post("/login", usuario.login)


// Routers FormaPagamentoModel
router.post("/formaPagamento/add", auth.authUser, usuario.addFormaPagamento)
router.get("/formaPagamento/search", auth.authUser, usuario.searchAllFormaPagamento)
router.delete("/formaPagamento/:id", auth.authUser, usuario.deleteFormaPagamento)
router.put("/formaPagamento/update", auth.authUser, usuario.updateFormaPagamento)

// Routers CarrinhoModel
router.post("/carrinho/add", auth.authUser, usuario.addCarrinho)
router.get("/carrinho/search", auth.authUser, usuario.searchCarrinho)
router.put("/carrinho/addItem", auth.authUser, usuario.addProdutoCarrinho)
router.delete("/carrinho/:idItem", auth.authUser, usuario.deleteProdutoCarrinho)
router.put("/carrinho/altQtd", auth.authUser, usuario.alterarQtdProdutoCarrinho)

// Routers PedidoModel
router.post("/pedido/add", auth.authUser, usuario.addPedido)
router.get("/pedido/allPedido", auth.authUser, usuario.allPedido)
router.get("/pedido/:idPedido", auth.authUser, usuario.searchPedido)
router.delete("/pedido/:idPedido", auth.authUser, usuario.cancelPedido)



module.exports = router;