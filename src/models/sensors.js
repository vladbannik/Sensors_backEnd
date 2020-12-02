const { Schema, model } = require('mongoose');

const schema = Schema({
  id: {
    type: String,
    unique: true,
  },
  token: String,
  ownerId: String,
  description: String,
  data: { type: Date, default: Date.now }
});

module.exports = model('Sensors', schema);
