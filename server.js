'use strict';

var express = require('express'),
    app = express(),
    request = require('request'),
    path = require('path'),
    yahooApiUrlService = require('./yahooApiUrlService');

app.use('/node_modules', express.static(path.join(__dirname, '/node_modules')));
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/hello', function (req, res) {
    res.send('Hello class!');
});

app.get('/api/quote/:symbol', function (req, res) {
    var stockUrl = yahooApiUrlService.generateRequestUrl(req.params.symbol);

    request(stockUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(JSON.parse(body));
        } else {
            res.send(error);
        }
    });
});

app.listen(8081, function () {
    console.log('stockWatch app listening at: http://localhost:8081/');
});

