$(document).ready(function () {
    $('.search-bar button').click(function (e) {
        var userInput = $('#stockInputSymbol').val();
        lookupStock(userInput);
    });

    function lookupStock(symbol) {
        var stockUrl = ['https://query.yahooapis.com/v1/public/yql?q=',
            encodeURIComponent('select * from yahoo.finance.quotes '),
            encodeURIComponent('where symbol in (\'' + symbol + '\')'),
            '&format=json&diagnostics=true&env=',
            encodeURIComponent('store://datatables.org/alltableswithkeys')]
            .join('');

        $.get(stockUrl, function (data, status) {
            var response = data.query.results.quote;

            $('.stock-info .stock-name').text(response.Symbol);
            $('.stock-info .stock-desc').text(response.Name);
            $('.stock-info .stock-last-traded').text('last traded: ' + response.LastTradeDate);

            var currentAsk = Number(response.Ask).toFixed(0);
            $('.stock-info .stock-price').text('$' + currentAsk);

            $('.stock-info .stock-price-change').text(response.Change);
        });
    }
});


