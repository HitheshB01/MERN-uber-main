// Steps to Remember While Building an Application
// Let’s use a simple question and answer approach to remember each step:

// 1. How does the app start?
//    server.js: Starts the app by listening on a port and importing app.js.

// 2. What’s the main file controlling everything?
//    app.js: It connects to the database, sets up middleware, and defines routes.

// 3. How does the app talk to the database?
//    db.js: Manages the MongoDB connection.

// 4. Where are the API endpoints defined?
//    userRoutes.js: Specifies which requests go where (e.g., registration or login).

// 5. Who does the heavy lifting for each request?
//    userController.js: Executes the business logic for each API endpoint.

// 6. Where is the database schema defined?
//    userModel.js: Structures the data for MongoDB.


const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/simple_app';

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

// Define a User Schema (Model)
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema); // Create User model

// Define Routes
app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start the Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));





// How This File Covers All Steps
// Server Setup:

// The Express server starts listening on the defined PORT.
// Database Connection:

// The MongoDB connection is set up using mongoose.connect().
// Middleware:

// app.use(express.json()) parses incoming JSON requests.
// Routes:

// /register: Handles user registration by saving data to MongoDB.
// /login: Handles user login by checking credentials.
// Model:

// userSchema: Defines the structure of the user data.
// Flow:

// A client sends a POST request to /register or /login.
// The app processes the request, interacts with MongoDB, and returns a response.
