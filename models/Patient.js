const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  zipCode: String
});

const PatientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  title:{
  	type: String,
  	enum: ['Miss', 'Mr.', 'Ms.', 'Mrs.']
  },
  email: {
    type: String,
    required: true
  },
  phone: {
  	type: Number,
  	required: true
  },
  address:{
    type:[addressSchema],
    required:false
  }
});

const Patient = mongoose.model('Patient', PatientSchema);

module.exports = Patient;