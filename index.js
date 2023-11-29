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

app.get("/",(req,resp)=>{
    resp.json({"message":"okay"})
})


app.listen(8000,(req,resp)=>{
    console.log("server running on http://localhost:8000")
})