const { check } = require('express-validator');

const emailValidator = check('email')
  .exists()
  .isEmail()
  .normalizeEmail()
  .trim();

const passwordValidator = check('password', 'Password is required')
  .exists()
  .trim();

const signUpPasswordValidator = check('password', 'Password field must have length from 3 to 12')
  .exists()
  .isLength({ min: 3, max: 12 })
  .trim();

const passwordConfirmationValidator = check('passwordConfirmation', 'Password confirmation field must have the same value as the password field')
  .exists()
  .custom((value, { req }) => value === req.body.password)
  .trim();

module.exports = {
  emailValidator,
  passwordValidator,
  signUpPasswordValidator,
  passwordConfirmationValidator,
};
