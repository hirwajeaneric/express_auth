require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const colors = require('colors');

app.use(express.json());

app.listen(process.env.PORT, () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log(`listening on port ${process.env.PORT}`.bgCyan.white);
    })
    .catch(err => console.log("> Couldn't connect to MongoDB...".bgRed));
});

