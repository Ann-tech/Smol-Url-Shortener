const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  shortId: {
    type: String,
    required: true,
    unique: true
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true
  },
  longUrl: {
    type: String,
    required: true,
  },
  isCustomized: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date,
  },
  updated_at: {
    type: Date,
    default: Date,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
});

// Define the validation function
const urlValidation = (val) => {
  const urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
  console.log(urlRegex.test(val))
  return urlRegex.test(val);
};

// Specify the fields to apply the validation to
const fieldsToValidate = ['shortUrl', 'longUrl'];

// Apply the validation function to each field
fieldsToValidate.forEach((fieldName) => {
  linkSchema.path(fieldName).validate(urlValidation, 'Invalid URL.');
});

const Link = mongoose.model('Link', linkSchema);

module.exports = Link;
