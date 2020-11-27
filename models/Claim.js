const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  insurance_name: {
    type: String,
    required: true
  },
  patient_email: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  items: {
    type: String,
    required: true
  },
  status:{
    required: true
  }
});

const Claim = mongoose.model('Claim', UserSchema);

module.exports = Claim;