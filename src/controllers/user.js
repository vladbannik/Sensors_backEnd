const { validationResult } = require('express-validator');
const UserModel = require('../models/user');

const getAllUsers = async (req, res) => {
  try {
    const docs = await UserModel.find({ }).select('id email approve -_id');
    res.status(200).json(docs);
  } catch (e) {
    res.status(500).send('Something went wrong');
  }
};

const approveUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;

  try {
    await UserModel.findOneAndUpdate({ id }, { approve: true }, { upsert: true });
    res.status(200).json({ success: 'OK' });
  } catch (e) {
    res.status(500).send('Something went wrong');
  }
};

const deleteUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;

  try {
    await UserModel.findOneAndDelete({ id });
    res.status(200).json({ success: 'OK' });
  } catch (e) {
    res.status(500).send('Something went wrong');
  }
};

module.exports = { approveUser, deleteUser, getAllUsers };
