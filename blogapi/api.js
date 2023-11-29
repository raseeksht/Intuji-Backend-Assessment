const express = require("express")
const {blogModel,categoryModel} = require("../models")

const router = express.Router()

router.get("/",(req,resp)=>{
    resp.send("use endpoint /api/blogs or /api/categories")
})

router.use("/blogs",require("./blogs"))
router.use("/categories",require("./categories"))

// router.get("/",async (req,resp)=>{
//     try{
//         const blogs = await blogModel.find({})
//         console.log(blogs)
//         resp.json({"status":"OK",blogs})
//     }catch(err){
//         resp.json({"status":"failed",err})
//     }
// })

// router.post("/",async (req,resp)=>{
//     const {title, description,category} = req.body
//     console.log(title,description,category)
//     resp.send("ok")
// })

module.exports = router