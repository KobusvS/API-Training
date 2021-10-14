const { check, validationResult } = require('express-validator');
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('pages'))
    // app.get('/', function(req, res) {
    //     res.sendFile('index.html');
    // });

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// app.use(upload.array());
// app.use(express.static('pages'));

app.all('*', function(req, res, next) {
    console.log(res.statusCode)
    console.log(req.path)
    console.log(req.hostName)
        // console.table(req.headers)

});
const loginValidate = [
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
    .escape(),
    check('confirm-password')
    .custom(() => {
        if (req.body.password === req.body.confirm - password) {
            return true;
        } else {
            return false;
        }
    })
    .withMessage('Passwords do not match')

];


app.post('/api', loginValidate, function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    } else {
        let name = req.body.name;
        let email = req.body.email;
        let password = req.body.password;
        res.sendFile('success.html')
    }
});


// console.log(req.body);
// res.sendFile('success.html');


app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`)
});