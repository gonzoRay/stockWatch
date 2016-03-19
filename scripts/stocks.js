
    function lookupStock(symbol) {
        var stockUrl = ['https://query.yahooapis.com/v1/public/yql?q=',
                        encodeURIComponent('select * from yahoo.finance.quotes '),
                        encodeURIComponent('where symbol in (\'' + symbol + '\')'),
                        '&format=json&diagnostics=true&env=',
                        encodeURIComponent('store://datatables.org/alltableswithkeys')]
                        .join('');
        $.get(stockUrl, function(data, status) {
            console.log(data.query.results);
        });
    }