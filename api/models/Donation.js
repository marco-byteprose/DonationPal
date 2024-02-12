const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const DonationSchema = new Schema({
    message: {
        type: String,
        require: true,
        trim: true
    },
    amount: {
        type: Number,
        require: true
    },
    date: {
        type: Date,
        require: true
    }
});

mongoose.model('donations', DonationSchema);