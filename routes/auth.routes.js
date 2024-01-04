const express = require('express');
const { SignIn, SignUp } = require('../controller/auth.controller');
const authRoute = express.Router();

authRoute.post('/signin', SignIn);
authRoute.post('/signup', SignUp);

module.exports = authRoute;