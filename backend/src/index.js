import express from "express"; // Importing Express framework
import cors from "cors"; // Importing CORS middleware for enabling cross-origin requests
import excelRoutes from './routes/index.js'; // Importing routes for Excel functionality
import API_PATH from "./utils/constants.js"; // Importing API path constant
import dotenv from "dotenv"; // Importing dotenv for environment variable management
dotenv.config(); // Loading environment variables from .env file

const app = express(); // Creating Express app instance
const PORT = process.env.PORT || 5001; // Setting port from environment variable or defaulting to 5001 if not provided

app.use(cors()); // Adding CORS middleware to allow cross-origin requests
app.use(express.json()); // Adding middleware to parse JSON request bodies

// Mounting Excel routes under specified API path
app.use(API_PATH, excelRoutes);

// Starting the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`); // Logging server start message
});
