const express = require('express');
var controller = require('../controllers/booking.controller');

var router = express.Router();


router.get('/booking', function (req, res) {
    res.render('client/booking', { user: req.user });
})

router.post('/booking/send', controller.sendBooking);




module.exports = router;
