const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
    },
    description:{
        type:String
    },
    category:{
        type: mongoose.Types.ObjectId,
        ref:"category"
    }
})

const categorySchema = new mongoose.Schema({
    categoryName:String
})

const blogModel = mongoose.model("blog",blogSchema)
const categoryModel = mongoose.model("category",categorySchema)


module.exports = {blogModel,categoryModel}