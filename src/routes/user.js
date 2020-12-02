const express = require('express');
const withJWT = require('../utils/withJWT');
const { approveUser, deleteUser, getAllUsers } = require('../controllers/user');

const router = express.Router();

router.get('/', withJWT, getAllUsers);

router.patch('/approve/:id', withJWT, approveUser);

router.delete('/:id', withJWT, deleteUser);

module.exports = router;
