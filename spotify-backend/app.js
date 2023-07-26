const express = require("express");
require('dotenv').config();
const mongoose = require("mongoose");
const authentication = require('./routes/auth.js');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT;
const cookieAuth = require('./middleware/cookie-auth.js');

const uri = "mongodb+srv://dzng1234:ajJmPm9ae6ovvTbv@spotify-cluster.e6daz2x.mongodb.net/?retryWrites=true&w=majority";

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post("/hello", (req, res, next) => {
});

app.use("/auth", authentication);

mongoose.connect(uri).then(result => {
    app.listen(process.env.PORT, () => {
    })
}).catch(error => {
    console.log(error);
});


process.on('SIGINT', function() {
    mongoose.connection.close(function () {
      console.log('Mongoose disconnected through app termination');
      process.exit(0);
    });
});