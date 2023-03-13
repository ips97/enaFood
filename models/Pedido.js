const mongoose = require("mongoose")
const Schema = mongoose.Schema


const Pedido = new Schema({
    idUsuario:{
        type: Schema.Types.ObjectId,
        ref: "usuarios",
        required: true
    },
    itens:{
        type: Array,
        required: true
    },
    valorTotal:{
        type: Number,
        required: true
    },
    cpfCliente:{
        type: Number
    },
    formaPagamento:{
        type: Array,
        required: true
    },
    endEntrega:{
        type: Array,
        required: true
    },
    status: {
        type: String,
        required: true
    }


})


mongoose.model("pedidos", Pedido)