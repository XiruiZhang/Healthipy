const express = require('express');
const moment = require('moment');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const User = require('../models/User');
const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');

// Pharmacy Page
router.get('/home', (req, res) => {
    // console.log('3');
    // console.log(req.method);
    // console.log(req.path);
    res.render('customer_home')
});

module.exports = router;