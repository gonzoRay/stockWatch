$(document).ready(function () {
    $('.search-bar button').click(function () {
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
            $('.stock-info .stock-price').text(response.Ask);
            $('.stock-info .stock-price-change').text(response.Change);

            if (isPriceChangePositive(response.Change)) {
                $('.stock-info .stock-price-change').toggleClass();
            }

            console.log(response);
        });
    }

    function isPriceChangePositive(priceChange) {
        return priceChange.indexOf('+') > -1;
    }

});


