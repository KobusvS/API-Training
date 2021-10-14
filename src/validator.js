
const { check } = require('express-validator');

const loginValidate = () => [
    check('name_field', 'Name should not contain numbers or special characters').trim(),
    check('email_field', 'Enter a valid email address')
    .isEmail()
    .trim()
    .escape()
    .normalizeEmail(),
    check('password_field')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches('[0-9]')
    .withMessage('Password must contain a number')
    .matches('[A-Z]')
    .withMessage('Password must contain an uppercase letter')
    .trim()
    .escape(),
    check('confirm_password_field')
    .custom(() => {
        if (req.body.password_field === req.body.confirm_password_field) {
            return true;
        } else {
            return false;
        }
    })
    .withMessage('Passwords do not match')

];

module.exports = loginValidate;