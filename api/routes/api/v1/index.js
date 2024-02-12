const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
require('models/Campaign');
require('models/Donation');

const Campaign = mongoose.model('campaigns');
const Donation = mongoose.model('donations');

// Root Route
router.get('/', (req, res) => {
    res.send("Root API route");
});

// Returns all campaigns in database
router.get('/campaigns', async (req, res) => {
    const filter = {};
    const campaigns = await Campaign.find(filter);
    console.log(campaigns);
    res.json(campaigns);
});

module.exports = router;