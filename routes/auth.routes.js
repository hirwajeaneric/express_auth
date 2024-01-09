const express = require('express');
const { SignIn, SignUp, ForgotPassword } = require('../controller/auth.controller');
const authRoute = express.Router();

authRoute.post('/signin', SignIn);
authRoute.post('/signup', SignUp);
authRoute.post('/forgot-password', ForgotPassword);

module.exports = authRoute;