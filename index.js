const { MongoClient } = require("mongodb");
const express=require("express");
const app=express();
require("dotenv").config();
const PORT = process.env.PORT || 8000;
const uri=process.env.uri
const client = new MongoClient(uri, { useNewUrlParser: true });
const listEditRouter = require("./list-edit-router");
const listViewRouter = require("./list-view-router");

app.use(express.json());
app.use("/api/tasklist", listViewRouter);
app.use("/api/tasklist", listEditRouter);




//   app.post("/tasks", async (req, res) => {
//     const body=req.body
//     try{const db = client.db("taskList");
//     const collection = db.collection("tasks"); 
//     const newDocument=await collection.insertOne(body)
//     if(newDocument)
//     {res.status(201).send(newDocument)}
//     else{
//         res.status(400).send("Error")
//     }
// }
//     catch(error){
// console.log(error)
//     }
  
// });


app.get("/", function (req, res) {
    res.send("Welcome to my TaskList \u{1F4D3}");
  });

app.listen(PORT,(req,res)=>{
    console.log(`http://localhost:${PORT}`)
})
