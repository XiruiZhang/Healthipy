const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: String,
  number: Number
});

const AppointmentSchema = new mongoose.Schema({
  pharmacy_email: {
    type: String,
    required: true
  },
  patient_email: {
    type: String,
    required: true
  },
  datetime: {
    type: Date,
    default: Date.now
  },
  items: {
    type: [medicineSchema],
    required: false
  }
});

const Medicine = mongoose.model('Medicine', medicineSchema);
const Appointment = mongoose.model('Appointment', AppointmentSchema);

module.exports = Medicine;
module.exports = Appointment;