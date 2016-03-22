var express = require('express'),
    app = express(),
    request = require('request'),
    path = require('path');

app.use('/node_modules', express.static(path.join(__dirname, '/node_modules')));
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/hello', function (req, res) {
    res.send('Hello class!');
});

app.get('/api/quote/:symbol', function (req, res) {
    var stockUrl = generateRequestUrl(req.params.symbol);

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

//Helper functions
function generateRequestUrl(symbol) {
    var baseUrl = 'https://query.yahooapis.com/v1/public/yql?q=';

    return [
        baseUrl,
        encodeURIComponent('select * from yahoo.finance.quotes '),
        encodeURIComponent('where symbol in (\'' + symbol + '\')'),
        '&format=json&diagnostics=false&env=',
        encodeURIComponent('store://datatables.org/alltableswithkeys')
    ]
        .join('');
}