const { Schema, model } = require('mongoose');

const schema = Schema({
  id: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: String,
  approve: Boolean,
});

module.exports = model('User', schema);
