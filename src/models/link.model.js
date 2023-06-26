const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  shortUrl: {
    type: mongoose.SchemaTypes.Url,
    required: true,
  },
  longUrl: {
    type: mongoose.SchemaTypes.Url,
    required: true,
  },
  shortId: {
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

const Link = mongoose.model('Link', linkSchema);

module.exports = Link;
