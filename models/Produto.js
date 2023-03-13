const mongoose = require("mongoose")
const Schema = mongoose.Schema


const Produto = new Schema({
   nome:{
    type: String,
    required: true
   },
   categoria:{
    type: String,
    required: true
   },
   codBarra:{
      type: Number,
      required: true
   },
   valor:{
    type: Number,
    required: true
   },
   estoque:{
      type: Number,
      required: true
   }

})


mongoose.model("produtos", Produto)