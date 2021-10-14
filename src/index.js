const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('pages'))
app.get('/', function(req, res) {
    res.sendFile('index.html');
});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// app.use(upload.array());
app.use(express.static('pages'));

app.all('*', function(req, res, next) {
    console.log(res.statusCode)
    console.log(req.path)
    console.log(req.host)
    console.table(req.headers)
    next()
})

app.post('/api/details', function(req, res) {
    console.log(req.body);
    res.send('Thank you for submitting your details!')
})


app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`)
});