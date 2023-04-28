const express = require('express');
const { connectMongoDb } = require('./database');
const router = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');



const port = process.env.PORT || 70
const app = express();

// Add cors
app.use(cors())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

// parse body data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Route configuration
app.use(router)
app.use("/", (req, res) => {
    res.send('Server is running ');
})


//Connect Database
connectMongoDb()


// Start server
app.listen(port, () => {
    console.log(`Server listening on ${port}`)
})