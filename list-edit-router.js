const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const connectDB = require("./db");
require("dotenv").config();



// Importa los middlewares
const { validateMethodHttp, validateErrors } = require("./middlewares/validationsMiddlewares");


// Usa los middlewares en tus rutas
router.use(validateMethodHttp);

const users = [
  {
    email: "leylagisela@gmail.com",
    user: "legive",
    password: "1234",
    rol: "admin",
  },
  {
    email: "interra_2012@yahoo.com",
    user: "interra",
    password: "12345",
    rol: "user",
  },
];

// Mi lista de tareas
//const taskList = require("./data");

router.use(express.json());



router.use(validateMethodHttp);



router.post("/", validateErrors,async (req, res) => {
  const newTask = req.body;
  const db = await connectDB();
  try {
    const result = await db.collection("tasks").insertOne(newTask);
    res.status(201).json({ message: "Task added successfully." });
  }catch (error) {
    console.log(error)
    res.status(500).json({ error: "Internal Server Error" });
  }
  
});

const validateTask = async(req, res, next) => {
  const id = req.params.id;
  const db = await connectDB();
 try{
  const collection = db.collection("tasks");
  await collection.findOne({_id: new ObjectId(id)});
  next();
 }catch(error){
  return res.status(404).json({ error: "Task not found" });
 }
    
  
  
};

router.delete("/:id", validateTask, async (req, res) => {
  const id = req.params.id;
try{
  const db = await connectDB();
  await db.collection("tasks").deleteOne({_id: new ObjectId(id)});
  res.status(201).json({ mensaje: "Task deleted successfully." });
 
}catch(error){
  res.status(500).json({ error: "Internal Server Error" });
}
});


router.put("/:id", validateErrors, validateTask,async (req, res) => {
  const id = req.params.id;
  const task = req.body;

  if (!task) {
    return res.status(400).json({ error: "Request body is empty." });
  }

  const db = await connectDB();
  try {
    // Verificar si la tarea existe antes de intentar actualizar
   
    const updateTask = { $set: { ...task } };
    await db.collection("tasks").updateOne({ _id: new ObjectId(id) }, updateTask);

    res.status(201).json({ mensaje: "Task updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  });

//Crea una ruta /login con el método POST para hacer el proceso de autenticación
router.post("/login", (req, res) => {
  const userName = req.body.user;
  const userPass = req.body.password;

  const user = users.find((user) => user.user === userName); 
  
  if (user) {
    if (userPass === user.password) {
      const payload = {
        email: user.email,
        rol: user.rol,
        user: user.user,
        password: user.password,
      };
      
      const token = jwt.sign(payload, process.env.SECRET_KEY );

      res.status(200).send({ mensaje: "Welcome to the platform", token });
  
    } else {
      return res.status(401).send({ error: "Invalid user name or password" });
    }
  } else {
    return res.status(401).send({ error: "Invalid user name or password" });
  }
 
});


module.exports = router;
