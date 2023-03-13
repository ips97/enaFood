const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require("./config/db");
const mongoose = require("mongoose");
const usuario = require("./routes/usuario")
const admin = require("./routes/admin")
const cors = require("cors")
require("dotenv").config()


    // CORS
    app.use(cors())
    // Body Parser
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false}));
    // Mongoose
    mongoose.Promise = global.Promise;
    mongoose.connect(db.mongoURI).then(() =>{
        console.log("Conectado ao mongo");
    }).catch((err) =>{
        console.log("Erro ao se conectar: " + err);
    });

    app.use("/usuario", usuario)
    app.use("/admin", admin)

app.listen(8080, ()=> {

    console.log("Servidor Rodando")

})