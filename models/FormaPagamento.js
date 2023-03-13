const mongoose = require("mongoose")
const Schema = mongoose.Schema


const FormaPagamento = new Schema({
    
    numeroCartao:{
        type: Number,
        required: true
    },
    nomeTitular:{
        type: String,
        required: true
    }, 
    cpfTitular:{
        type: Number,
        required: true
    },
    tipoCartao:{
        type: String,
        required: true
    },
    vencimentoCartao:{
        type: String,
        required: true
    },
    codCartao:{
        type: Number,
        required: true
    },
    idUsuario:{
        type: Schema.Types.ObjectId,
        ref: "usuarios",
        required: true
    }

})


mongoose.model("formaPagamento", FormaPagamento)