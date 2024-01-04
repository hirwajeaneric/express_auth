const { model } = require('mongoose');
const UserModel = require('../models/user.model');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SignUp = async (req, res, next) => {
    const { fullName, email, password } = req.body;
    try {
        var userExists = await UserModel.findOne({ email: email });
        console.log(userExists);
        if (userExists) {
            res.status(401).json({ message: "User with this email already exists"});
        } else {
            const hashedPassword = bcryptjs.hashSync(password, 10);
            
            var newUser = new UserModel({
                email: email, 
                password: hashedPassword, 
                fullName: fullName 
            });

            var savedUser = await newUser.save();
            res.status(201).json({ message: 'Account created!'});
        }
    } catch (error) {
        res.status(500).json({ message: error.message });   
    }
};

const SignIn = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await UserModel.findOne({ email: email});
        if (!validUser) return res.status(500).json({ message: "Wrong password or email!" });    


        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return res.status(500).json({ message: "Wrong password or email!" });    

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY);

        const { password: hashedPassword, ...rest } = validUser._doc;

        const expiryDate = new Date(Date.now() + 3600000); // 1 hour

        res
            .cookie('access_token', token, { httpOnly: true, expires: expiryDate})
            .status(200)
            .json(rest);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    SignIn,
    SignUp
}