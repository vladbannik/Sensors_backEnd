const express = require('express');
const { ownerId } = require('../validation/sensors');
const withJWT = require('../utils/withJWT');

const {
  getSensors,
  createSensor,
  updateSensor,
  deleteSensors
} = require('../controllers/sensors')

const router = express.Router();

router.get('/:ownerId', getSensors);
router.post('/', [ownerId, withJWT], createSensor);
router.patch('/:id', [withJWT], updateSensor);
router.delete('/:id', withJWT, deleteSensors);


module.exports = router;