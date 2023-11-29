const express = require("express")
const {blogModel,categoryModel} = require("../models")
const mongoose = require("mongoose")

const router = express.Router()

router.get("/",async (req,resp)=>{
    try{
        const categories = await categoryModel.find({})
        console.log(categories)
        resp.json({"status":"OK",categories})
    }catch(err){
        resp.json({"status":"failed",err})
    }
})

router.post("/",async (req,resp)=>{
    const {categoryName} = req.body
    if (!categoryName){
        resp.status(400).json({"status":"failed","message":"categoryName should be present"})
    }
    try{
        // check if categoryName is already in database, return err if found
        const unique = await categoryModel.countDocuments({categoryName})
        if (unique > 0 ){
            return resp.json({"status":"failed",message:"category already exists"})            
        }
        const response = await categoryModel.create({categoryName})
        resp.json({"status":"ok",message:"New Category Created Successfully",newCategory:response})
    }
    catch(err){
        resp.status(500).json({"status":"failed","message":err})
    }
})

router.delete("/:categoryId",async (req,resp)=>{
    const categoryId = req.params.categoryId
    console.log(categoryId)
    try{
        const _id = new mongoose.mongo.ObjectId(categoryId)
        const a = await categoryModel.deleteOne({_id})
        console.log(a)
        // const res = await categoryModel.deleteOne({__id })
        // console.log(res)
        resp.status(204).json({"status":"ok","message":"deleted"})

    }catch(err){
        console.log(err)
        resp.status(500).json({"status":"failed",message:err})
    }
})

module.exports = router