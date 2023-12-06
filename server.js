// Load environment variables from a .env file
require('dotenv').config();

// Import necessary modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// Import database connection configuration
const connection = require('./configs/connection');
const userRoute = require('./routes/user.routes');
const addressRoute = require('./routes/address.routes');
const countryRoute = require('./routes/country.routes');
const stateRoute = require('./routes/state.routes');
const cityRoute = require('./routes/city.routes');
const BrandRoute = require('./routes/brand.routes');
const BrandModelRoute = require('./routes/brand_model.routes');
const categoryRoute = require('./routes/category.routes');
const vendorRoute = require('./routes/vendor.routes');
const productRoute = require('./routes/product.routes');
const wishlistRoute = require('./routes/wishlist.routes');

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

app.use('/uploads', express.static('uploads'));
app.use('/users', userRoute);
app.use('/address', addressRoute);
app.use('/countries', countryRoute);
app.use('/states', stateRoute);
app.use('/cities', cityRoute);
app.use('/brands', BrandRoute);
app.use('/models', BrandModelRoute);
app.use('/categories', categoryRoute);
app.use('/vendors', vendorRoute);
app.use('/products', productRoute);
app.use('/wishlists', wishlistRoute);

// Synchronize the database connection and start the server
connection.sync().then(() => {
    app.listen(PORT, () => {
        // Log a message when the server is successfully running
        console.log(`Server is running on port ${PORT}`);
    });
});
