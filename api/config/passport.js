const passport = require('passport');
const UserModel = require('../models/User');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

// Helper functions
// NOTE: cb (callback function) expects two values: err, user

// Function that will process email and password against the database
let authenticateLogin = async (email, password, cb) => {
    // Search for User with supplied email
    UserModel.findOne({email})
    .then(async (user) => {
        // If no user, then 'null' for error value and 'false' for user value
        if (!user) {
            return cb(null, false);
        }

        // Found valid 'user' 
        // Validate 'user' object 'hash' and 'secret' fields w/ entered password using utility function (isValidPassword) -> match, 'isValid' variable = true
        const isValidPwd = await user.isValidPassword(password);
        if (isValidPwd) {
            return cb(null, user);
        } else {
            // password failed
            return cb(null, false);
        }
    })
    .catch((err) => {
        // Application error
        cb(err);
    });
}

// Function that extracts user ID from a given token
let getUserFromToken = async (token, cb) => {
    try {
        return cb(null, token.payload);
    } catch(err) {
        cb(err);
    }
}

// Passport middleware

// Local strategy for logging in user
// 'login' is nickname for strategy; create new local Strategy to interact w/ database
// Provide object that has our field names
// Use defined function (authenticateLogin) to process email and password to find a user
passport.use('login', new localStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    authenticateLogin
));

// JWT strategy for reading a token and providing access to resource
passport.use(new JWTstrategy(
    // Use secret key in .env to determine user
    // Retrieve token from request header, 
    {
        secretOrKey: process.env.TOP_SECRET_KEY,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    },
    getUserFromToken
));