const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');

const signIn = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const docs = await UserModel.findOne({ email }).exec();

    // eslint-disable-next-line no-throw-literal
    if (!docs) throw 'Email is incorrect, email does not exist';

    const result = await bcrypt.compare(password, docs.password);

    // eslint-disable-next-line no-throw-literal
    if (!docs.approve) throw 'Your account must be approved';

    // eslint-disable-next-line no-throw-literal
    if (!result) throw 'Email or password is incorrect';

    const token = jwt.sign({ email: docs.email, id: docs.id }, process.env.SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (e) {
    res.status(422).json({ error: { message: e } });
  }
};

const signUp = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const hashPassword = await bcrypt.hash(password, 10);

  try {
    await UserModel.create({
      id: uuidv4(),
      email,
      password: hashPassword,
      approve: false,
    });
    res.status(200).json({ success: 'User created' });
  } catch (e) {
    res.status(422).json({ error: { message: 'Email is already taken' } });
  }
};

module.exports = { signIn, signUp };
