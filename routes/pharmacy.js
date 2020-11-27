const express = require('express');
const moment = require('moment');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const User = require('../models/User');
const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');

// Pharmacy Page
router.get('/home', ensureAuthenticated, (req, res) => {
    // console.log('3');
    // console.log(req.method);
    // console.log(req.path);
    res.render('pharmacy_home', {
        user: req.user
    })
});

// Pharmacy Details Page
router.get('/details', ensureAuthenticated, (req, res) => {
    res.render('pharmacy_details', {
    })
});

//create patient profile
router.get('/create_patient_profiles', ensureAuthenticated, (req, res) => {
    res.render('pharmacy_createpatientprofiles', {
    })
});

router.post('/create_patient_profiles', ensureAuthenticated, (req, res) => {
    const { name, title, email, phone, street, city, state, zip } = req.body;
    let errors = [];

    if (!name || !title || !email || !phone || !street || !city || !state || !zip) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (errors.length > 0) {
        res.render('create_patient_profiles', {
            errors,
            name,
            title,
            email,
            phone,
            street,
            city,
            state,
            zip
        });
    } else {
        Patient.findOne({ email: email }).then(user => {
            if (user) {
                errors.push({ msg: 'Email already exists' });
                res.render('create_patient_profiles', {
                    errors,
                    name,
                    title,
                    email,
                    phone,
                    street,
                    city,
                    state,
                    zip
                });
            } else {
                const newPatient = new Patient({
                    name: name,
                    title: title,
                    email: email,
                    phone: phone
                });
                newPatient.address.push({street: street, city: city, state: state, zipCode: zip});
                
                newPatient.save;
                req.flash(
                        'success_msg',
                        'The patient profile is created successfully.'
                    );
                console.log('Appointment success!');
                res.redirect('home');

            }
        })
    }
});

//search patient profile
router.get('/search_patient_profiles', ensureAuthenticated, (req, res) => {
    res.render('pharmacy_searchpatientprofiles', {
    })
});

//upload patient files
router.get('/upload_patient_files', ensureAuthenticated, (req, res) => {
    res.render('pharmacy_uploadpatientfiles', {
    })
});

router.post('/upload_patient_files', (req, res) => {
    const fileUpload = req.body.fileUpload;
    let errors = [];
    if(!fileName){
        errors.push({ msg: 'Please choose the file to upload!' });
    }
    if(errors.length > 0){
        res.render('pharmacy_uploadpatientfiles', {
            errors,
            fileUpload
        });
    } else {
        console.log("testing");
    }
}

//pharmacy appointment
router.get('/appointments', ensureAuthenticated, (req, res) => {
    res.render('pharmacy_appointments', {
    })
});

router.post('/appointments', (req, res) => {
    const { email, datetime, medicine, number } = req.body;
    console.log(req.body);
    console.log(medicine);
    console.log(number);
    const medNum = medicine.length;
    let errors = [];
    if (!email || !datetime) {
        errors.push({ msg: 'Please fill in all fields to make the appointment.' });
    }

    //var now = moment();
    Patient.findOne({ email: email }).then(patient => {
        if (!patient) {
            errors.push({ msg: 'Patient email does not exist!' });
            res.render('pharmacy_appointments', {
                errors,
                email,
                datetime
            });
        } else {
            const appointment = new Appointment({
                pharmacy_email: req.user.email,
                patient_email: email,
                datetime: datetime,
            });

            for (i = 0; i < medNum; i++) {
                appointment.items.push({ name: medicine[i], number: number[i] });
            }

            appointment.save(function (err, appointment) {
                if (err) {
                    console.log(err);
                } else {
                    req.flash(
                        'success_msg',
                        'The appointment is set successfully.'
                    );
                    console.log('Appointment success!')
                    res.redirect('home');
                }
            });
        }
    });

});

//pharmacy claim
router.get('/claims', ensureAuthenticated, (req, res) => {
    res.render('pharmacy_claims', {
    })
});

//pharmacy patient profile
router.post('/pharmacyspace', (req, res) => {
    const email = req.body.email;
    User.findOne({ email: email }).then(user => {
        if (user) {
            var name = user.name;
            res.render('pharmacyrecord', {
                email,
                name
            });
        } else {
            errors.push({ msg: 'Username does not exit!' });
            res.render('pharmacyspace', {
                errors
            });
        }
    })

});

module.exports = router;