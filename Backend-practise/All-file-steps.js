// topics to Cover
// axios
// protected routing
// useContext
// useRef
// useEffect
// GSap , useGsap

// 1. Server (Start the app)
//    Start the server and pass control to app.js

// server.js
const http= require('http')
const app= require('./app') 
const server=http.createServer(app)
server.listen(3000,()=>console.log("server is running on port 3000"))

// 2. Database (Connect to MongoDB)
//    Handle MongoDB connection.

// db.js
const mongoose = require("mongoose");
module.exports = async() =>
await  mongoose.connect("mongodb://localhost:27017/simple_app")
               .then(() => console.log("DB connected"));

// 3. App (Control the flow)
//    Set up middleware, connect DB, and define routes.

// app.js
const express = require("express");
const connectDB = require("./db");
const userRoutes = require("./userRoutes");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}))   
connectDB();
app.use("/user", userRoutes);
module.exports = app;

// 4. Routes (Define endpoints)
//    Define routes and map them to controller functions.

// userRoutes.js
const express = require("express");
const { register, login } = require("./userController");
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
module.exports = router;

// 5. Controller (Handle requests)
//    Process requests and call service for CRUD.

// userController.js
const { createUser, findUserByEmail } = require("./userService");
exports.register = async (req, res) => res.send(await createUser(req.body));
exports.login = async (req, res) =>
  res.send(await findUserByEmail(req.body.email));

// 6. Service (CRUD operations)
//    Perform database operations (create, read, etc.).

// userService.js
const User = require("./userModel");
exports.createUser = async (data) => User.create(data);
exports.findUserByEmail = async (email) => User.findOne({ email });

// 7. Model (Define the data structure)
//    Define the schema for MongoDB.

// userModel.js
const mongoose = require("mongoose");
module.exports = mongoose.model(
  "User",
  new mongoose.Schema({ name: String, email: String, password: String })
);
