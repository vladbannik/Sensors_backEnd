const express = require('express');
const { sensorId, data, token } = require('../validation/datasets');
const withJWT = require('../utils/withJWT');

const {
  getData,
  createData,
  deleteData
} = require('../controllers/datasets')

const router = express.Router();

router.get('/:sensorId', getData);
router.post('/', [sensorId, data, token], createData);
router.delete('/:id', withJWT, deleteData);


module.exports = router;