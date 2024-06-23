const mongoose = require('mongoose');
const User = require('../models/user');
const passport = require('passport');

const register = async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({ message: 'All fields required' });
    }

    const user = new User({
        name: req.body.name,
        email: req.body.email,
    });

    // Correct the method name here
    user.setPassword(req.body.password);

    try {
        const savedUser = await user.save();
        return res
            .status(201)
            .json({ token: user.generateJWT() });
    } catch (err) {
        return res
            .status(400)
            .json({ message: 'Error registering user' });
    }
};

const login = (req, res) => {
    // Validate message to ensure that email and password are present.
    if (!req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({ message: 'All fields required' });
    }

   // Delegate authentication to passport module
   passport.authenticate('local', (err, user, info) => {
    if (err) {
        return res
            .status(404)
            .json(err);
    }

    if (user) {
        const token = user.generateJWT();
        res
            .status(200)
            .json({ token });

    } else {
        res
            .status(401)
            .json(info);
    }   
    })(req, res);
}

module.exports = {
    register,
    login
};
