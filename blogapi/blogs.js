const express = require("express")
const {blogModel,categoryModel} = require("../models")
const mongoose = require("mongoose")

const router = express.Router()

const checkPayload = (payload) => {
    // return fail json if key is missing else null
    for (let key in payload){
        if (payload[key] == undefined){
            return {"status":"failed","message":`'${key}' is missing`,payload}
        }
    }
}

async function countCategoryById(_id){
    const count = await categoryModel.countDocuments({_id});
    return count;

}


router.get("/",async (req,resp)=>{
    try{
        const blogs = await blogModel.find({}).populate('category','categoryName')
        const populatedSimplifiedBlogs = blogs.map(blog=>({
            _id:blog._id,
            title:blog.title,
            description:blog.description,
            category:blog.category.categoryName
        }))
        resp.json({"status":"OK",blogs:populatedSimplifiedBlogs})
    }catch(err){
        resp.json({"status":"failed",err})
    }
})

router.post("/",async (req,resp)=>{
    const {title, description,categoryId} = req.body

    // checks if title,description and categoryId and create new blogs only if all required fields are present
    const invalidPayload = checkPayload({title,description,categoryId})
    if (invalidPayload){
        return resp.status(400).json(invalidPayload)
    }
    try{
        // check if category exists before assigning category to blog
        const categoryFound = await categoryModel.countDocuments({_id:categoryId})
        // console.log(categoryFound)
        if (categoryFound){
            const res = await blogModel.create({title,description,category:categoryId})
            resp.json({"status":"ok",message:"new blog created",newBlog:res})
        }else{
            console.log(categoryFound)
            resp.json({"status":"failed",message:"Invalid categoryId detected"})
        }

    }catch(err){
        resp.status(500).json({"status":"failed",message:"failed to add blog",err})
    }
})

router.get("/:blogId",async (req,resp)=>{
    try{
        let res = await blogModel.findOne({_id:req.params.blogId}).populate('category','categoryName')
        if (res){
            const simplifiedPopulatedBlog = {
                _id:res._id,
                title:res.title,
                description:res.description,
                category:res.category.categoryName
            }
            resp.json({"status":"ok",blog:simplifiedPopulatedBlog})
        }else{
            resp.status(404).json({"status":"failed",message:"No Blog with that blogId found"})
        }
    }catch(err){
        resp.status(500).json({status:"failed","message":err})
    }
})

router.put("/:blogId",async(req,resp)=>{
    const {title, description,categoryId} = req.body
    console.log(categoryId)
    try{
        // check if the new categoryId is a valid and existing categoryId, if not reject update
        const count = await countCategoryById(categoryId)
        if (count == 1){
            const blog = await blogModel.findOne({_id:req.params.blogId})
            blog.title = title ? title : blog.title
            blog.description = description ? description : blog.description
            blog.category = categoryId ? categoryId : blog.category
            blog.save()
            const populatedRes = await blog.populate("category","categoryName")
            if (populatedRes){
                const { _id, title, description, category } = populatedRes;
                const simplifiedPopulatedRes = {_id,title,description,category:category.categoryName}
                resp.json({"status":"Blog Updated Successfully",updatedBlog:simplifiedPopulatedRes})
    
            }
        }else{
            resp.status(400).json({"status":"failed","message":"Invalid categoryId detected"})
        }      
        
    }catch(err){
        resp.status(500).json({"status":"failed","message":err})
    }
})

router.delete("/:blogId",async(req,resp)=>{
    const _id = new mongoose.mongo.ObjectId(req.params.blogId)
    try{
        const res = await blogModel.deleteOne({_id})
        // console.log(res)
        resp.status(204).json({"status":"ok",message:"deleted"})
    }catch(err){
        resp.status(500).json({"status":"failed",message:"Error deleting blog",err})
    }
})

module.exports = router