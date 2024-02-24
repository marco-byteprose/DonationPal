const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Root route
router.get('/', (req, res) => {
    res.send("Root Users Route");
});

// .post(url path, passport middleware, success function(find user), fail function(did not find user) );
router.post('/login', passport.authenticate('login', {session: false, failWithError: true}), 
    function (req, res) {
        console.log(req.user);

        const payload = { id: req.user._id, email: req.user.email};

        // jwt.sign( payload, encryption key, set of options);
        const token = jwt.sign( {payload}, process.env.TOP_SECRET_KEY, { expiresIn: '1m'} );

        loginObject = {};
        loginObject._id = req.user._id;
        loginObject.email = req.user.email;
        loginObject.accessToken = token;
        console.log(loginObject);
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

module.exports = router;