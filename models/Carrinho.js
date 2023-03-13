const mongoose = require("mongoose")
const Schema = mongoose.Schema


const Carrinho = new Schema({
    idUsuario:{
        type: Schema.Types.ObjectId,
        ref: "usuarios",
        required: true
    },
    itens:{
        type: Array
    },
    valorTotal:{
        type: Number,
        required: true
    }

})


mongoose.model("carrinhos", Carrinho)