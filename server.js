require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const colors = require('colors');
const allRoutes = require('./routes');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

app.listen(process.env.PORT, () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log(`> listening on port ${process.env.PORT}`.bgMagenta.white);
    })
    .catch(err => console.log("> Couldn't connect to MongoDB...".bgRed));
});

app.use('/api/expauth/v1/', allRoutes);