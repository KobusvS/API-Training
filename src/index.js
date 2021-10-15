const validate = require('express-validator');
const loginValidate = require('./validator');
const bodyParser = require('body-parser');
const routes = require('../routes/route')
const express = require('express');
const path = require('path');
const app = express();
const port = 3001;
const fs = require('fs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(loginValidate());
app.use(express.static('pages'));
app.use('/', routes);

app.all('*', function(req, res, next) {
    console.log(res.statusCode)
    console.log(req.path)
    console.log(req.hostName)
        // console.table(req.headers)
    next();
});

const postSuccess = path.join(__dirname, '..', 'pages', 'success.html');
console.log('postSuccess: ', postSuccess);

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/pages/index.html');
// });

app.post('/form', function(req, res) {
    console.log('form post');
    try {

        const errors = validate.validationResult(req);

        if (errors) {
            throw errors;
        }

        fs.readFile(postSuccess, function(error, file) {

            if (error) {
                throw error;
            }
            const { name_field, email_field, password_field } = req.body;
            console.log('req.body;: ', req.body);
            console.log('file: ');
            const fileToSend = file.toString()
                .replace('${{name}}', name_field)
                .replace('${{email}}', email_field)
                .replace('${{password}}', password_field)
            res.status(200).type('html').send(fileToSend);
            res.end();

        })

    } catch (error) {

        res.status(400).type('text').write(JSON.stringify(error));
        res.end();

    }

});

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`)
});