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

// Return campaign of specific id, including related donations
router.get('/campaigns/:id', async (req, res) => {
    const campaignId = new mongoose.Types.ObjectId(req.params.id);
    const filter = { _id: campaignId };
    
    const campaign = await Campaign.aggregate([
        // Stage 1 - filter campaign document by id
        { $match: filter},

        // Stage 2 - Left outer join to donations collection
        { $lookup: {
            from: "donations",
            localField: "_id",
            foreignField: "campaign_id",
            as: "donations"
        }}
    ]);
    res.json(campaign);
});

module.exports = router;