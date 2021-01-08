const { Schema, model } = require('mongoose');

const entrySchema = new Schema({
  author: {
    type: Schema.ObjectId,
    ref: 'User',
  },
  title: String,
  description: String,
  location: String,
  createdAt: {
    type: Date,
    default: new Date
  },
  updatedAt: {
    type: Date,
    default: new Date
  },
  coordinates: [],
  file: String,
});

module.exports = model('Entry', entrySchema);
