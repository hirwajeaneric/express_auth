const authRoute = require('./auth.routes');
const express = require('express');
const allRoutes = express.Router();

allRoutes.use('/auth', authRoute);

module.exports = allRoutes;