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

// function: on delete cascade behaviour
// if a category is deleted, all the blogs that have that specific category will be deleted as well
categorySchema.pre("deleteOne",async function (next){
    refId = this.getQuery()._id
    // console.log("this refid will be deleted",refId)
    // get all the blogs whose category match the category to be deleted
    try{
        const result = await blogModel.deleteMany({category:refId})
        // console.log("the resulting blogs are s",result)
        next()
    }
    catch(err){
        console.log("err occured",err)
        next(err)
    }
})


const blogModel = mongoose.model("blog",blogSchema)
const categoryModel = mongoose.model("category",categorySchema)


module.exports = {blogModel,categoryModel}