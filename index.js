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
app.use("/api/v1/tasklist", listViewRouter);
app.use("/api/v1/tasklist", listEditRouter);


app.get("/", function (req, res) {
    res.send("Welcome to my TaskList \u{1F4D3}");
  });

app.listen(PORT,(req,res)=>{
    console.log(`http://localhost:${PORT}`)
})
