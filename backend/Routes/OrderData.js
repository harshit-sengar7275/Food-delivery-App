const express = require("express");
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderData', async (req, res) => {
    let data = req.body.order_data;

    // Updated: Check if the request contains order_date
    if (!req.body.Order_date) {
        return res.status(400).send("Order date is required."); // Added validation for Order_date
    }

    await data.splice(0, 0, { Order_date: req.body.Order_date });

    let eId = await Order.findOne({ 'email': req.body.email });
    console.log(eId);
    if (eId === null) {
        try {
            await Order.create({
                email: req.body.email,
                order_data: [data]
            });
            return res.status(201).json({ success: true }); // Updated: Use status 201 for created
        } catch (error) {
            console.log(error.message);
            return res.status(500).send(error.message); // Updated: Use res.status for error messages
        }
    } else {
        try {
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            );
            return res.json({ success: true });
        } catch (error) {
            return res.status(500).send(error.message); // Updated: Use res.status for error messages
        }
    }
});

router.post('/myorderData', async(req, res) => {
    try {
        let myData = await Order.findOne({'email': req.body.email})
        res.json({orderData:myData})
    } catch (error) {
        return res.status(500).send(error.message);
    }
})

module.exports = router;
