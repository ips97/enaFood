const mongoose = require("mongoose")
const Schema = mongoose.Schema


const Admin = new Schema({
    nome:{
        type: String,
        required: true
    },
    sobrenome:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    senha:{
        type: String,
        required: true,
    },
    cpf: {
        type: Number,
        required: true,
        unique: true
    },
    dataNascimento:{
        type: Date,
        required: true
    }

})


mongoose.model("usuariosAdmin", Admin)