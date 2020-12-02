const { Schema, model } = require('mongoose');

const schema = Schema({
  id: {
    type: String,
    unique: true,
  },
  sensorId: String,
  datas: Object,
  data: { type: Date, default: Date.now }
});

module.exports = model('Datasets', schema);
