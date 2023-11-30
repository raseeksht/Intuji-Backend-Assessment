const express = require("express")
const mongoose = require("mongoose")
const {blogModel} = require("./models")
const api = require("./blogapi/api")

// connection with mongodb
if (process.env.devServer){
    var uri = "mongodb://127.0.0.1:27017/intujiBackend"
}else{
    var uri = process.env.mongoUri
}

mongoose.connect(uri).then(()=>{
    console.log("connected with mongoose")
}).catch((err)=>{
    console.log("Error connecting with mongodb")
})



const app = express()
app.use(express.json())

app.use("/api",api)

const html = `<h1>Intuji Backend Assessment</h1>
<h3>Blog API</h3>
<div>Api documentation: <a href="https://documenter.getpostman.com/view/26416014/2s9YeHZW6U#648236f5-a42b-40fe-84c8-5ac55351b201" target="_blank">https://documenter.getpostman.com/view/26416014/2s9YeHZW6U#648236f5-a42b-40fe-84c8-5ac55351b201</a></div>
<div>Github Source Code: <a href="https://github.com/raseeksht/Intuji-Backend-Assessment" target="_blank">https://github.com/raseeksht/Intuji-Backend-Assessment</a></div>

<h4>Api Endpoints</h4>
<ol>
    <li> Blogs 
        <ul>
            <li> (get) /api/blogs </li>
            <li> (get) /api/blogs/&lt;blogId&gt;</li>
            <li> (post) /api/blogs </li>
            <li> (put) /api/blogs/&lt;blogId&gt; </li>
        </ul>
    </li>
    <li> Categories
        <ul>
            <li> (get) /api/categories </li>
            <li> (post) /api/categories </li>
            <li> (delete) /api/categories/&lt;categoryId&gt; </li>
        </ul>
    </li>

</ol>

`

app.get("/",(req,resp)=>{
    resp.send(html)
})


app.listen(8000,(req,resp)=>{
    console.log("server running on http://localhost:8000")
})