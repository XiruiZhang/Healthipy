const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');
//email
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
var jwt = require('jsonwebtoken');

const secret_token = require('../config/keys').SECRET_TOKEN;

// Login Page
router.get('/pharmacy_login', forwardAuthenticated, (req, res) => res.render('pharmacy_login'));

// Register Page
router.get('/pharmacy_register', forwardAuthenticated, (req, res) => res.render('pharmacy_register'));

// Login Page
router.get('/customer_login', forwardAuthenticated, (req, res) => res.render('customer_login'));

// Register Page
router.get('/customer_register', forwardAuthenticated, (req, res) => res.render('customer_register'));

//pharmacy Page
//router.get('/pharmacy', forwardAuthenticated, (req, res) => res.render('pharmacy'));

//registerdone page
router.get('/registerdone', forwardAuthenticated, (req, res) => res.render('registerdone'));

router.get('/verifidone', forwardAuthenticated, (req, res) => res.render('verifidone'));

//pharmacy record page
//router.get('/pharmacyrecord', forwardAuthenticated, (req, res) => res.render('pharmacyrecord'));


// Register
router.post('/pharmacy_register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  //var API_KEY = '71f0c8751acedb374993cb3ad01b9166-a83a87a9-33a538c2';
  //var DOMAIN = 'sandboxe6be6df7b39d4cf3927a944d1307051d.mailgun.org';
  const API_KEY = require('../config/keys').API_KEY;
  const DOMAIN = require('../config/keys').DOMAIN;
  const auth = {
    auth:{
      api_key: API_KEY,
      domain: DOMAIN
    }
  };

  //const secret_token = require('../config/keys').SECRET_TOKEN;
  const token = jwt.sign({email}, secret_token, {expiresIn: '1d'});
  //const url = 'http://localhost:5000/verification/';
  
  const transporter = nodemailer.createTransport(mg(auth));

  let mailOptions = {
      from: 'healthydp2020@outlook.com',
      to: 'susulli.cheung@gmail.com',
      subject: 'Hello from Healthy✔',
      html: '<p>Please click the verification link below to activate your account!<p><a href="http://localhost:5000/users/verification/' + token + '">here</a></p></p>'
  };

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('pharmacy_register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('pharmacy_register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {

        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                transporter.sendMail(mailOptions, (err, info) => {
                  if (err) {
                    console.log(err);
                  }else{
                    req.flash(
                      'success_msg',
                      'You are now registered. You can close the window and check your email to verify the account.'
                    );
                    res.redirect('/users/registerdone');
                    console.log('Email sent: %s', info.messageId);   
                  }
                });
              })
              .catch(err => console.log(err));
          });
        });
        
      }
    });
  }
});

// router.get('https://healthbank-api-service.herokuapp.com/api/0.1.0/auth/register', (req, res, next) => {
//   console.log("test");
//   res.render('pharmacy_register');
// });

//Login
router.post('/pharmacy_login', (req, res, next) => {
  const { email, password } = req.body;

  //const url = 'http://localhost:5000/' + email +'/pharmacyspace';

  passport.authenticate('local', {
    successRedirect: '/pharmacy/home',
    failureRedirect: '/users/pharmacy_login',
    failureFlash: true
  })(req, res, next);
  // console.log('1');
  // console.log(req.method);
  // console.log(req.path);
});

//Verification
router.get('/verification/:token', (req, res) => {
  const token = req.params.token;
  let errors = [];

  if(!token){
    console.log('No token provided!');

  }else{
    jwt.verify(token, secret_token, function(err, decodedToken){
      if(err){
        errors.push({msg: 'Incorrect or expired link!'});
        //res.render();
        console.log(err);
        return res.status(400).send(err);
      }

      const{email} = decodedToken;
      User.findOne({email: email}).then(user => {
        if(user){
          user.verified = true;
          User.updateOne(
            {"email": email},
            {"verified": true}
          );
          user.save();
          console.log('User verified!');
          res.redirect('/users/verifidone');
        }
      })
    });
  }

  // try {
  //   const { user: { email } } = jwt.verify(token, secret_token);
  //   User.update({ verified: true }, { where: { email } });
  //   res.redirect('/users/verifidone');
  // } catch (e) {
  //   console.log(e);
  // }

})

//registerdone
router.post('/registerdone', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/users/pharmacy_login',
    failureRedirect: '/users/registerdone',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/pharmacy_login');
});

module.exports = router;
