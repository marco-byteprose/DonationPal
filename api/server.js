require('dotenv').config();
require('app-module-path').addPath(__dirname);

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');

// Routers
const apiRouter = require('./routes/api/v1/index');
const usersRouter = require('./routes/api/v1/users');
const donationsRouter = require('./routes/api/v1/donations');

// App initialization
const app = express();

// Passport initialization
require('config/passport');

// Configure the rate limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});

// Connect to Mongo via mongoose
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then( () => console.log('MongoDB connected.') )
.catch( err => console.log(err) );

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(limiter);

if(process.env.NODE_ENV === 'production') {
    app.use(cors({
        origin: "https://sp24-43600-mh42-donationpal.ue.r.appspot.com"
    }))
} else {
    app.use(cors());
}


app.use('/api/v1', apiRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/donations', donationsRouter);

module.exports = app;
