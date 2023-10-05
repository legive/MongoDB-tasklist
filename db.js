const { MongoClient } = require("mongodb");
require("dotenv").config();
const PORT = process.env.PORT || 8000;
const uri=process.env.uri

const client = new MongoClient(uri, { useNewUrlParser: true });

const dbName = "taskList";

const connectDB = async ()=>{
    try {
      await client.connect();
      return client.db(dbName);
    } catch (error) {
      console.error("Error al conectar a la base de datos:", error);
      throw error;
    }
   
  }


module.exports=connectDB;