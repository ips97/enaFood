const express = require("express")
const router = express.Router()
const auth = require("../config/auth")


// Controller
const admin = require("../controllers/adminController")
const usuario = require("../controllers/usuarioController")


// Routers UserModel
router.get("/usuario/:cpf", auth.authAdmin, usuario.search)
router.put("/usuario/update", auth.authAdmin, usuario.updateUserbyAdmin)
router.get("/usuario/all", auth.authAdmin, usuario.allUser)
router.delete("/usuario/:_id", auth.authAdmin, usuario.deleteUser)

// Routers AdminModel
router.post("/login", admin.loginAdmin)
router.post("/add", auth.authAdmin, admin.addAdmin);
router.get("/:cpf", auth.authAdmin, admin.searchAdmin);
router.put("/update", auth.authAdmin, admin.updateAdmin);
router.delete("/:_id", auth.authAdmin, admin.deleteAdmin);


// Routers ProdutoModel
router.post("/produto/add", auth.authAdmin, admin.addProduto)
router.get("/produto/:codBarra", auth.authAdmin, admin.searchProduto)
router.delete("/produto/:_id", auth.authAdmin, admin.deleteProduto)
router.put("/produto/update", auth.authAdmin, admin.updateProduto)
router.get("/produto/all", auth.authAdmin, admin.allProduto)





module.exports = router;