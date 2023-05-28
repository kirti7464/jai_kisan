const express =require('express')
const app=express()
const mongoose = require('mongoose')
const route = require('../src/routes/route')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoose.connect("mongodb+srv://kirti227464:rPuz1zllF8q04JrZ@cluster0.2yqrios.mongodb.net/test").then(()=>console.log("MOngoDB connected")).catch((er)=>console.log("MongoDb Not connected"))

app.use('/',route)


app.listen(3000,function(){
    console.log(`the server is working fine on port 3000`)
})