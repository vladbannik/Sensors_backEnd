const { check } = require('express-validator');

const ownerId = check('ownerId', 'Name must be required').exists();


module.exports = { ownerId };
