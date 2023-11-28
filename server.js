// Load environment variables from a .env file
require('dotenv').config();

// Import necessary modules
const express = require('express');
const cors = require('cors');

// Import database connection configuration
const connection = require('./configs/connection');
const userRoute = require('./routes/user.routes');

// Set the port for the server to run on, defaulting to 7000 if not specified in the environment
const PORT = process.env.PORT || 7000;

// Create an Express application
const app = express();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Define a simple route for the root endpoint
app.get('/', (req, res) => {
    try {
        // Respond with a JSON message
        res.status(200).json({
            status: true,
            msg: 'Hello from Mobile-Genie!'
        });
    } catch (error) {
        // Handle errors and respond with a 500 status code
        console.log(error.message);
        res.status(500).json({
            status: false,
            msg: error.message
        });
    }
});

app.use('/users', userRoute);

// Synchronize the database connection and start the server
connection.sync().then(() => {
    app.listen(PORT, () => {
        // Log a message when the server is successfully running
        console.log(`Server is running on port ${PORT}`);
    });
});
