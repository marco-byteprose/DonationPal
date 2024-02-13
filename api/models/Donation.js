const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const DonationSchema = new Schema({
    campaign_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
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