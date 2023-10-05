const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const connectDB = require("./db");




const { validarRuta, JWTValidation } = require("./middlewares/validationsMiddlewares");

const { ObjectId } = require("mongodb");
router.use(express.json());


//router.use(validarRuta);

router.get("/tasks", async (req, res) => {
  //acceder a la BD
  const db = await connectDB();
  const collection = db.collection("tasks");
  const document = await collection.find({}).toArray();
  res.send(document);
});

 //Crea una ruta protegida que haga la validación de un token JWT recibido dentro de un header de autorización que esté en la petición.
router.get("/routeAdmin",JWTValidation, (req, res) => {
  console.log("entro")
  res.send({ mensaje: "Welcome admin", user: req.user });
});


// Ruta para listar tareas completas (GET /tasks/completed)
router.get("/completed",async (req, res) => {
  const db = await connectDB();
  const collection = db.collection("tasks");
  const document = await collection.find({isComplete:true}).toArray();
  res.send(document);
});

// Ruta para listar tareas incompletas (GET /tasks/incomplete)
router.get("/notCompleted",async (req, res) => {
  const db = await connectDB();
  const collection = db.collection("tasks");
  const document = await collection.find({isComplete:false}).toArray();
  res.send(document);
});


// Obtener una sola tarea
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id)
  const db = await connectDB();
  const collection = db.collection("tasks");
  try {
    const document = await collection.findOne({ _id: new ObjectId(id) });

    if (!document) {
      res.status(404).json({ error: "Task not found" });
    } else {
      res.json(document);
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Internal Server Error" });
  }
});







module.exports = router;

