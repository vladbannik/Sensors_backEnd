const express = require('express');
const {
  emailValidator,
  passwordConfirmationValidator,
  passwordValidator,
  signUpPasswordValidator,
} = require('../validation/auth');
const { signIn, signUp } = require('../controllers/auth');

const router = express.Router();

router.post('/sign-in', [
  emailValidator,
  passwordValidator,
], signIn);

router.post('/sign-up', [
  emailValidator,
  signUpPasswordValidator,
  passwordConfirmationValidator,
], signUp);

module.exports = router;
