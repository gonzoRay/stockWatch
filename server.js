var express = require('express'),
    app = express(),
    request = require('request'),
    path = require('path'),
    yahooApiService = require('./YahooApiUrlService');

app.use('/npm', express.static(path.join(__dirname, '/node_modules')));
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/hello', function (req, res) {
    res.send('Hello class!');
});

app.get('/api/quote/:symbol', function (req, res) {
    var symbol = req.params.symbol;
    var quoteUrl = yahooApiService.generateStockQuoteUrl(symbol);

    request(quoteUrl, function (error, response, body) {
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