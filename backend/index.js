import dotenv from 'dotenv';
dotenv.config(); // Import dotenv to manage environment variables

import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import User from './module/User.js'


const app = express();
const port = process.env.PORT || 5000; // Use environment variable for port or fallback to 3000
import cors from 'cors';
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// // Middleware for serving static files from the 'public' directory
// app.use(express.static(path.join(path.dirname(fileURLToPath(import.meta.url)), 'public')));

// // Middleware for parsing JSON and URL-encoded data
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// MongoDB connection using async/await
const connectDB = async () => {
    try {
      await mongoose.connect(process.env.mongoURI, {
        ssl: true,
      });
      console.log('MongoDB connected');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1); // Exit process with failure if unable to connect
    }
  };
  
  // Call the connectDB function to establish connection
  connectDB();

// // Serve static files from the React app
// app.use(express.static(path.join(path.dirname(fileURLToPath(import.meta.url)), 'client/build')));

// // For any other request, serve the index.html from the React app
// app.get('*', (req, res) => {
//     res.sendFile(path.join(path.dirname(fileURLToPath(import.meta.url)), 'client/build', 'index.html'));
// });

app.get('/', (req, res) =>{
    res.send("Server is up");
})
// Route to handle form submission (POST user data)
app.post('/form.jsx', async (req, res) => {
    const {username, name, rollno, emailid, phoneno, branch } = req.body;
    try {
        const user = new User({ username, name, rollno, emailid, phoneno, branch });
        const savedUser = await user.save();
        console.log("User saved to database:", savedUser);
        res.status(201).send("Sign-up successful"); // Use 201 status for resource creation
    } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).json({ message: "Error saving user", error: error.message }); // Return JSON error
    }
});


// Route to get all user data (GET user data)
app.get('/users', async (req, res) => {
    try {
        const users = await User.find(); // Retrieve all users
        res.json(users); // Respond with the retrieved user data in JSON format
    } catch (error) {
        console.error("Error retrieving users:", error);
        res.status(500).json({ message: "Error retrieving users", error: error.message }); // Return JSON error
    }
});

// Route to get a specific user by username (GET user data by username)
app.get('/users/:username', async (req, res) => {
    try {
        const username = req.params.username;
        const user = await User.findOne({ username }); // Retrieve the user by username
        if (user) {
            res.json(user); // Respond with the user data if found
        } else {
            res.status(404).json({ message: "User not found" }); // Respond with a 404 if the user doesn't exist
        }
    } catch (error) {
        console.error("Error retrieving user:", error);
        res.status(500).json({ message: "Error retrieving user", error: error.message }); // Return JSON error
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
