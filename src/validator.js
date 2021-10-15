const { check } = require('express-validator');

const loginValidate = () => [
    check('name', 'Name should not contain numbers or special characters').trim(),
    check('email', 'Enter a valid email address')
    .isEmail()
    .trim()
    .escape()
    .normalizeEmail(),
    check('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches('[0-9]')
    .withMessage('Password must contain a number')
    .matches('[A-Z]')
    .withMessage('Password must contain an uppercase letter')
    .trim()
    .escape()
];

module.exports = loginValidate;