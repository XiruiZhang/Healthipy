const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const User = require('../models/User');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

//pharmacy main page
router.get('/pharmacy', forwardAuthenticated, (req, res) => res.render('pharmacy'));

//pharmacy main page
router.get('/customer', forwardAuthenticated, (req, res) => res.render('customer'));

// Pharmacy Page
router.get('/pharmacyspace', ensureAuthenticated, (req, res) =>{
  // console.log('3');
  // console.log(req.method);
  // console.log(req.path);
  res.render('pharmacyspace', {
    user: req.user
  })
});

//pharmacy patient record
router.post('/pharmacyspace', (req, res) => {
  const email = req.body.email;
  User.findOne({ email: email }).then(user => {
      if (user) {
      	var name = user.name;
        res.render('pharmacyrecord', {
          email,
          name
        });
      }else{
        errors.push({ msg: 'Username does not exit!' });
        res.render('pharmacyspace', {
          errors
        });
      }
    })

});

module.exports = router;
