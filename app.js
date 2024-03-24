require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const connect = require('./server/routes/config/db'); // Connect to the database

// Create an Express app)
const app = express();
const PORT = 5000 || process.env.PORT;

connect();

app.use(express.static('public')); // Serve static files from the 'public' directory

app.use(express.urlencoded({ extended: true })); // Parse request bodies
app.use(express.json()); // Parse JSON request bodies

// Set up EJS as the view engine
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use('/', require('./server/routes/main'));

// Start the server
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
