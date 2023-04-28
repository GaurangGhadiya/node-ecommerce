const express = require('express');
const { connectMongoDb } = require('./database');
const router = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');



const port = process.env.PORT || 70
const app = express();

// Add cors
app.use(cors())

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