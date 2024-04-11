const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

require('models/Campaign');
require('models/Donation');

const Campaign = mongoose.model('campaigns');
const Donation = mongoose.model('donations');

// Helper functions
const getURL = (service) => {
    if (process.env.NODE_ENV === 'production') {
        if (service === 'client') {
            return process.env.PROD_CLIENT_URL;
        } else {
            return process.env.PROD_API_URL;
        }
    } else {
        if (service === 'client') {
            return process.env.DEV_CLIENT_URL;
        } else {
            return process.env.DEV_API_URL;
        }
    }
};

router.get('/', (req, res) => {
    res.send('Root API route for donations.');
});

router.post('/create_checkout', async (req, res) => {
    console.log(req.body);

    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: req.body.campaign_name
                    },
                    unit_amount: req.body.donation_amount
                },
                quantity: 1
            },
        ],
        mode: 'payment',
        success_url: `${getURL('api')}/donations/donation_success?success=true&session_id={CHECKOUT_SESSION_ID}&campaign_id=${req.body.campaign_id}`,
        cancel_url: `${getURL('client')}/home`,
        metadata: {
            campaign_id: req.body.campaign_id
        }
    });

    console.log(session);

    res.redirect(303, session.url);
});

router.get('/donation_success', async (req, res) => {
    console.log(req.query);

    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

    console.log(session);

    // TODO: Add a donation record to the database
    const campaignID = req.query.campaign_id;
    const donation_amount = session.amount_total/100;
    const paymentID = session.payment_intent;
    const date = new Date();

    // Donation document
    const donation = new Donation({
        campaign_id: mongoose.Types.ObjectId(campaignID),
        amount: donation_amount,
        date: date,
        payment_id: paymentID
    });

    try {
        await donation.save();
        console.log('Donation saved.');
    } catch (error) {
        console.error(`Error: ${error}`);
    }

    const clientURL = `${getURL('client')}/donation_success?campaign_id=${campaignID}&donation_amount=${donation_amount}`;

    res.redirect(303, clientURL);
});

module.exports = router;