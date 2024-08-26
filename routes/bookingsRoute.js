const express = require('express')
const router = express.Router();
const Booking = require('../models/bookings')
const Room = require('../models/room');
const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')('sk_test_51PqxzNP7ED4WsSitlhpOoeIhUlePE2iCC44sVsw8u7BbCHGaUYoX6swjYMfbcjE2MqRXbxG8zhzjNXqNLDTUHGEh00n67o69f7')
router.post('/bookroom', async (req, res) => {
    const { room, userid, fromdate, todate, totalAmt, total, token } = req.body
   
    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })
        const payment = await stripe.charges.create(
            {

                amount: totalAmt * 100,
                customer: customer.id,
                currency: 'USD',
                receipt_email: token.email
            },
            {
                idempotencyKey: uuidv4()
            }
        )
        if (payment) {
            
                const newbooking = new Booking({
                    room: room.name,
                    roomid: room._id,
                    userid,
                    fromdate,
                    todate,
                    totalAmt,
                    total,
                    transactionid: '1234'
                })
                
                const booking = await newbooking.save()

                const roomtemp = await Room.findOne({ _id: room._id })

                roomtemp.currentBookings.push({
                    bookingid: booking._id,
                    fromdate: fromdate,
                    todate: todate,
                    userid: userid,
                    status: booking.status
                })

                await roomtemp.save()
            
           
        }
        res.send('Payment Successfull')
    } catch (error) {
        return res.status(400).json({ message: error })
    }



})
module.exports = router;