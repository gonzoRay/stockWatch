$(document).ready(function () {
    $('.search-bar button').click(function (e) {
        e.preventDefault();
        var userInput = $('#stockInputSymbol').val();
        lookupStock(userInput);
    });

    function lookupStock(symbol) {
        var requestUrl = '/api/quote/' + symbol;

        $.get(requestUrl, function (data, status) {
            var response = data.query.results.quote;

            if(status === 'success' && response && response.Name) {
                clearStockInfo();
                clearError();
                updateStockInfo(response);
            } else if (status === 'success' && response && !response.Name){
                clearStockInfo();
                setError('No results found.');
            } else {
                clearStockInfo();
                setError('An unexpected error has occurred.');
            }
        });
    }

    function updateStockInfo(response) {
        $('.stock-info .stock-name').text(response.Symbol);
        $('.stock-info .stock-desc').text(response.Name);
        $('.stock-info .stock-last-traded').text('last traded: ' + response.LastTradeDate);

        var currentAsk = Number(response.Ask).toFixed(0);
        $('.stock-info .stock-price').text('$' + currentAsk);

        $('.stock-info .stock-price-change').text(response.Change);
    }

    function clearStockInfo() {
        $('.stock-info .stock-name').empty();
        $('.stock-info .stock-desc').empty();
        $('.stock-info .stock-last-traded').empty();
        $('.stock-info .stock-price').empty();
        $('.stock-info .stock-price-change').empty();
    }

    function setError(errorText) {
        $('.error-info #errorMessage').text(errorText);
    }

    function clearError() {
        $('.error-info #errorMessage').empty();
    }
});


