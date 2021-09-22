const express =require('express')
const mongoose=require('mongoose')
const url="mongodb://localhost/TestDB"
const TestDB=require('./model/TestDB')
const app=express()

mongoose.connect(url,{useNewUrlParser:false})

const con=mongoose.connection

con.on("open",function(){
    console.log('Connected.....')
})

app.use(express.json())

const TestDBrouters=require("./routers/TestDB")
app.use("/TestDB",TestDBrouters)





app.listen(5000,()=>{
    console.log('Server Started....')
})