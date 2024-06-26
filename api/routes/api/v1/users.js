const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
require('models/User');

const User = mongoose.model('users');

// Root route
router.get('/', (req, res) => {
    res.send("Root Users Route");
});

router.post('/register', passport.authenticate('register', {session: false}), async (req, res) => {
    res.status(200).json({
        message: 'Registration successful',
        user: req.user
    });
});

// .post(url path, passport middleware, success function(find user), fail function(did not find user) );
router.post('/login', passport.authenticate('login', {session: false, failWithError: true}), 
    function (req, res) {
        const payload = { id: req.user._id, email: req.user.email};

        // jwt.sign( payload, encryption key, set of options);
        const token = jwt.sign( {payload}, process.env.TOP_SECRET_KEY, { expiresIn: '1d'} );

        loginObject = {};
        loginObject._id = req.user._id;
        loginObject.email = req.user.email;
        loginObject.accessToken = token;
        return res.status(200).json(loginObject);
    }, 
    function (err, req, res) {
        errorResponse = {
            "error": {
                "name": "LoginError"
            },
            "message": "User not found",
            "statusCode": 401,
            "data": [],
            "success": false
        };
        return res.status(401).json(errorResponse);
    }
);

router.get('/me', passport.authenticate('jwt', {session: false}), async (req, res) => {
    // Return user details based on user.id, only available when valid accessToken exists
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const filter = { _id: userId };

    const fullUser = await User.aggregate([
        // Stage 1 - filter campaign document by id
        { $match: filter},

        // Stage 2 - Left outer join to donations collection
        { $lookup: {
            from: "donations",
            localField: "_id",
            foreignField: "user_id",
            as: "donations"
        }}
    ]);
    console.log(fullUser);

    res.status(200).json(fullUser);
});

module.exports = router;