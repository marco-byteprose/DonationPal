const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const DonationSchema = new Schema({
    campaign_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId
    },
    message: {
        type: String,
        trim: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    payment_id: {
        type: String
    }
});

mongoose.model('donations', DonationSchema);