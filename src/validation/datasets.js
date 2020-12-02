const { check } = require('express-validator');

const sensorId = check('sensorId', 'sensorId must be required').exists();
const data = check('data', 'Data must be required').exists();
const token = check('token', 'Token must be required').exists();


module.exports = { sensorId, data, token };
