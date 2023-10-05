const express=require("express");
const app=express();
const PORT = process.env.PORT || 8000;
require("dotenv").config()
app.use(express.json());




app.listen(PORT,(req,res)=>{
    console.log(`http://localhost:${PORT}`)
})
