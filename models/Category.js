const  mongoose = require("mongoose");


const CategorySchema = new mongoose.Schema({

  name : String,
  itemCount:Number,
  imageUrl: String,

})

module.exports = mongoose.model("Category", CategorySchema );