const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const CampaignSchema = new Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    description: {
        type: String,
        require: true,
        trim: true
    },
    goal: {
        type: Number,
        require: true
    },
    start_date: {
        type: Date,
        require: true
    },
    end_date: {
        type: Date,
        require: true
    }
});

mongoose.model('campaigns', CampaignSchema);