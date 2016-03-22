'use strict';

$(document).ready(function () {
    $('.search-bar button').click(function (e) {
        e.preventDefault();

        var userInput = $('#stockInputSymbol').val();
        if(!userInput){
            setError('Please enter a valid stock symbol.')
            return;
        }
        clearError();
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
        //Set text of stock information
        $('.stock-info .stock-name').text(response.Symbol);
        $('.stock-info .stock-desc').text(response.Name);
        $('.stock-info .stock-last-traded').text('last traded: ' + response.LastTradeDate);
        $('.stock-info .stock-price-change').text(response.Change);

        //Format ask price of stock to include $ and remove decimal places
        var currentAsk = Number(response.Ask).toFixed(0);
        $('.stock-info .stock-price').text('$' + currentAsk);

        //Color code price change (negative vs positive)
        if (isPriceChangePositive(response.Change)) {
            $('.stock-info .stock-price-change')
                .removeClass('text-danger')
                .addClass('text-success');
        } else {
            $('.stock-info .stock-price-change')
                .removeClass('text-success')
                .addClass('text-danger');
        }

        function isPriceChangePositive(priceChange) {
            return priceChange.indexOf('+') > -1;
        }
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


